(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=false;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=false;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
/**
 * Main entry point.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Api = require("./src/Api/Api");
exports.Api = Api;
var FloodgateEngine_1 = require("./src/FloodgateEngine");
exports.FloodgateEngine = FloodgateEngine_1.FloodgateEngine;

},{"./src/Api/Api":5,"./src/FloodgateEngine":16}],2:[function(require,module,exports){
"use strict";
/**
 * Class to track ticks against a list of expected counts in a thread-safe way
 * Main API of interest is incrementActivity, which returns an enumerated value indicating
 * whether or not the increment resulted in no thresholds crossed, a single activity threshold crossed,
 * or the final activity threshold crossed.
 */
var ActivityTracker = /** @class */ (function () {
    function ActivityTracker(trackingSet) {
        if (!trackingSet) {
            throw new Error("trackingSet must not be null");
        }
        if (trackingSet.getList().length > 32) {
            throw new Error("trackingSet list size must be less than 32");
        }
        this.isOrdered = trackingSet.getIsOrdered();
        this.trackedActivities = trackingSet.getList();
        /**
         * For ordered sets, the current index.
         */
        this.currentIndex = 0;
        this.activationMask = 0;
        this.currentActivationFlags = 0;
        this.isActivationByInitPending = false;
        this.currentCounts = new Array(this.trackedActivities.length);
        this.currentStartTimes = new Array(this.trackedActivities.length);
        this.currentSessionCounts = new Array(this.trackedActivities.length);
        for (var i = 0; i < this.trackedActivities.length; i++) {
            this.currentCounts[i] = 0;
            this.currentSessionCounts[i] = 0;
        }
        for (var i = 0; i < this.trackedActivities.length; i++) {
            this.activationMask |= 0x1 << i;
            if (this.trackedActivities[i].getCount() < 1) {
                this.trackedActivities[i].setCount(1);
            }
        }
    }
    /**
     * Get the count for the activity at the specified index. Returns 0 for out-of-range indices
     *
     * @param index index
     */
    ActivityTracker.prototype.getCount = function (index) {
        if (!this.isValidIndex(index)) {
            return 0;
        }
        return this.currentCounts[index];
    };
    /**
     * Get the count for the activity at the specified index, as tracked only for this session.
     * Returns 0 for out-of-range indices
     *
     * @param index index
     */
    ActivityTracker.prototype.getSessionCount = function (index) {
        if (!this.isValidIndex(index)) {
            return 0;
        }
        return this.currentSessionCounts[index];
    };
    /**
     * Get the StartTime for the activity at the specified index. Returns null for out-of-range indices
     *
     * @param index index
     */
    ActivityTracker.prototype.getStartTime = function (index) {
        if (!this.isValidIndex(index)) {
            return null;
        }
        return this.currentStartTimes[index];
    };
    /**
     * A get-and-set method. Returns the current SessionCount, resetting it to zero and adding it into
     * the established baseline.
     *
     * @param index index
     */
    ActivityTracker.prototype.moveSessionCountIntoBaseCount = function (index) {
        if (!this.isValidIndex(index)) {
            return 0;
        }
        var sessionCount = this.currentSessionCounts[index];
        this.currentSessionCounts[index] = 0;
        return sessionCount;
    };
    /**
     * Forcibly set the counts for the activities in the trackingSet.
     * Unlike other APIs, this expects vector indices to match the order
     * of the ActivityTrackingSet.List initially used to construct this tracker.
     * (When data is copied from a different IndexedTracker, it will properly use the IndexedTracker.Index to query internals)
     * Note:
     * 1) Assumes a count of 0 for any missing index in undersized arrays.
     * 2) Respects and enforces ordered list initialization (i.e. all init values are ignored once a unfinished activity is
     * encountered in an ordered tracking list).
     * 3) If the tracker is fully Activated as a result of this call, the next call to IncrementActivity will raise the
     * IncrementEdgeResult.AllActivitiesActivated, for any valid index accepted by IsPermittedIndexForActivationByInit().
     */
    ActivityTracker.prototype.initCounts = function (baselineCounts, otherTrackers, wasAlreadyActivatedThisSession) {
        // NOTE: baselineIncrements and sessionIncrements are sorted the same as the initial trackedActivity set, which
        // for this class is the same as trackedActivities
        if (wasAlreadyActivatedThisSession === void 0) { wasAlreadyActivatedThisSession = false; }
        for (var i = 0; i < this.trackedActivities.length; i++) {
            // Only accept values up to the current index, when ordered
            if (this.isOrdered && i > this.currentIndex) {
                break;
            }
            // Start off by pulling values from this session
            if (i < otherTrackers.length && otherTrackers[i]) {
                this.currentSessionCounts[i] = this.currentCounts[i] = otherTrackers[i].tracker.getSessionCount(otherTrackers[i].index);
                this.currentStartTimes[i] = otherTrackers[i].tracker.getStartTime(otherTrackers[i].index);
            }
            // If we've got a baseline from previous sessions, add it in as well
            if (this.trackedActivities[i].getIsAggregate() && i < baselineCounts.length) {
                this.currentCounts[i] += baselineCounts[i];
            }
            if (this.hasCountCrossedThreshold(i)) {
                this.finishActivityAtIndex(i);
            }
        }
        if (this.isActivated() && !wasAlreadyActivatedThisSession) {
            // Mark this object so that the next time any permitted activation event is logged, the survey will activate
            this.isActivationByInitPending = true;
        }
    };
    ActivityTracker.prototype.generateActivityIndexList = function () {
        var indexList = new Array();
        for (var i = 0; i < this.trackedActivities.length; i++) {
            var current = new ActivityTracker.ActivityIndex();
            current.activity = this.trackedActivities[i].getActivity();
            current.index = i;
            indexList.push(current);
        }
        return indexList;
    };
    /**
     * Increments the count at the specified index by the given increment.  Returns a value indicating whether
     * or not this call triggered a transition edge (activating the activity at 'index', or finishing the activation
     * of the final pending activity)
     */
    ActivityTracker.prototype.incrementActivity = function (index, increment) {
        if (!this.isValidIndex(index)) {
            return ActivityTracker.IncrementResult.Pending;
        }
        if (increment < 0) {
            throw new Error("increment must be non-negative");
        }
        // Ordered sets must be triggered in order.  We can only track at the current index, or before
        if (this.isOrdered && index > this.currentIndex) {
            return ActivityTracker.IncrementResult.Pending;
        }
        // Add to our counts after storing off our current state
        var startedLessThanThreshold = !this.hasCountCrossedThreshold(index);
        this.currentCounts[index] += increment;
        this.currentSessionCounts[index] += increment;
        if (this.isActivationByInitPending) {
            if (this.isPermittedIndexForActivationByInit(index)) {
                // This tracker was completed due to the initialization from previous increment data
                // now that we've store this activities increments, raise the AllActivitiesActivated signal
                return this.commitActivation();
            }
            else {
                // Still waiting for a valid re-activation activity
                return ActivityTracker.IncrementResult.Pending;
            }
        }
        if (!(startedLessThanThreshold && this.hasCountCrossedThreshold(index))) {
            // Still waiting for this activity to finish
            return ActivityTracker.IncrementResult.Pending;
        }
        // Mark this activity as complete in our flag collection
        this.finishActivityAtIndex(index);
        if (this.isActivated()) {
            return this.commitActivation();
        }
        return ActivityTracker.IncrementResult.SingleActivityActivated;
    };
    /**
     * Explicitly sets a start timestamp (now if startTime is null) for the specified activity index. Overwrites any previous StartTime.
     */
    ActivityTracker.prototype.startTime = function (index, startTime) {
        if (!this.isValidIndex(index)) {
            return;
        }
        this.currentStartTimes[index] = (!startTime) ? new Date() : startTime;
    };
    /**
     * Computes the "count" delta (delta in whatever units are appropriate for a subsequent call to IncrementActivity)
     * elapsed between now and a previously logged StartTime for this activity index.
     * Always clears the previous StartTime.
     * Returns 0 if no previous StartTime was logged, or if StartTime > StopTime
     */
    ActivityTracker.prototype.stopTime = function (index, stopTime) {
        if (!this.isValidIndex(index)) {
            return 0;
        }
        var startTime = this.currentStartTimes[index];
        this.currentStartTimes[index] = null;
        if (!startTime) {
            return 0;
        }
        stopTime = (!stopTime) ? new Date() : stopTime;
        if (startTime > stopTime) {
            return 0;
        }
        var deltaMS = stopTime.getTime() - startTime.getTime();
        // Currently all timer activities return seconds as the increment unit
        return deltaMS / 1000;
    };
    /**
     * Returns true if the index is valid for accessing the stored activity counts, false otherwise
     */
    ActivityTracker.prototype.isValidIndex = function (index) {
        return index < this.trackedActivities.length;
    };
    /**
     * Gets whether or not the full set of activities for this tracker have exceeded their trigger thresholds
     */
    ActivityTracker.prototype.isActivated = function () {
        return (this.currentActivationFlags & this.activationMask) === this.activationMask;
    };
    /**
        * Marks the activity at the index as finished. Includes setting the proper
        * activation flags and potentially advancing the current index for ordered tracking sets
        */
    ActivityTracker.prototype.finishActivityAtIndex = function (index) {
        if (!this.isValidIndex(index)) {
            throw new Error("Index is not valid");
        }
        this.currentActivationFlags |= 0x1 << index;
        if (index + 1 < this.trackedActivities.length) {
            this.currentIndex = index + 1;
        }
    };
    /**
     * @param index index
     * @return true if the counts for the activity at the specified index have met or exceeded the threshold count.
     */
    ActivityTracker.prototype.hasCountCrossedThreshold = function (index) {
        if (!this.isValidIndex(index)) {
            throw new Error("Index is not valid");
        }
        return this.currentCounts[index] >= this.trackedActivities[index].getCount();
    };
    /**
     * Returns true if the index refers to an activity that can re-activate a tracked object (aka return AllActivitiesActivated)
     * that was initialized as "complete" via initCounts.
     * Note: For unordered sets, any activity is valid. For ordered sequences, only the final activity is valid
     */
    ActivityTracker.prototype.isPermittedIndexForActivationByInit = function (index) {
        return !this.isOrdered || ((index + 1) === this.currentCounts.length);
    };
    ActivityTracker.prototype.commitActivation = function () {
        this.isActivationByInitPending = false;
        return ActivityTracker.IncrementResult.AllActivitiesActivated;
    };
    return ActivityTracker;
}());
(function (ActivityTracker) {
    /**
     * Structure returned by an ActivityTracker to call back into
     * IncrementActivity with valid index values
     */
    var ActivityIndex = /** @class */ (function () {
        function ActivityIndex() {
        }
        return ActivityIndex;
    }());
    ActivityTracker.ActivityIndex = ActivityIndex;
    var IncrementResult;
    (function (IncrementResult) {
        /**
         * No thresholds crossed as a result of this increment operation
         */
        IncrementResult[IncrementResult["Pending"] = 0] = "Pending";
        /**
         * The threshold for the targeted activity index was crossed as a result of this increment operation
         */
        IncrementResult[IncrementResult["SingleActivityActivated"] = 1] = "SingleActivityActivated";
        /**
         * The threshold for the targeted activity index was crossed as a result of this increment operation
         * and this was the final activity being tracked
         */
        IncrementResult[IncrementResult["AllActivitiesActivated"] = 2] = "AllActivitiesActivated";
    })(IncrementResult = ActivityTracker.IncrementResult || (ActivityTracker.IncrementResult = {}));
})(ActivityTracker || (ActivityTracker = {}));
module.exports = ActivityTracker;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Basic structure used to configure an ActivityTracker
 */
var ActivityTrackingData = /** @class */ (function () {
    function ActivityTrackingData(activity, count, isAggregate) {
        this.activity = activity;
        this.count = count;
        this.isAggregate = isAggregate;
    }
    ActivityTrackingData.prototype.getActivity = function () {
        return this.activity;
    };
    ActivityTrackingData.prototype.getCount = function () {
        return this.count;
    };
    ActivityTrackingData.prototype.setCount = function (count) {
        this.count = count;
    };
    ActivityTrackingData.prototype.getIsAggregate = function () {
        return this.isAggregate;
    };
    return ActivityTrackingData;
}());
exports.ActivityTrackingData = ActivityTrackingData;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to hold a collection of Activity Tracking Data
 */
var ActivityTrackingSet = /** @class */ (function () {
    function ActivityTrackingSet(isOrdered, list) {
        this.isOrdered = isOrdered;
        this.list = list;
    }
    ActivityTrackingSet.prototype.getIsOrdered = function () {
        return this.isOrdered;
    };
    ActivityTrackingSet.prototype.getList = function () {
        return this.list;
    };
    return ActivityTrackingSet;
}());
exports.ActivityTrackingSet = ActivityTrackingSet;

},{}],5:[function(require,module,exports){
"use strict";
/**
 * Parent module for all modules in Api/
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ISurveyInfo = require("./../ISurveyInfo");
exports.ISurveyInfo = ISurveyInfo;
var IActivityListener = require("./IActivityListener");
exports.IActivityListener = IActivityListener;
var IFloodgateStorageProvider = require("./IFloodgateStorageProvider");
exports.IFloodgateStorageProvider = IFloodgateStorageProvider;
var IFloodgateStringProvider = require("./IFloodgateStringProvider");
exports.IFloodgateStringProvider = IFloodgateStringProvider;
var IPromptComponent = require("./IPromptComponent");
exports.IPromptComponent = IPromptComponent;
var ISurvey = require("./ISurvey");
exports.ISurvey = ISurvey;
var ISurveyComponent = require("./ISurveyComponent");
exports.ISurveyComponent = ISurveyComponent;

},{"./../ISurveyInfo":22,"./IActivityListener":6,"./IFloodgateStorageProvider":7,"./IFloodgateStringProvider":8,"./IPromptComponent":9,"./ISurvey":10,"./ISurveyComponent":11}],6:[function(require,module,exports){
"use strict";
var IActivityListener;
(function (IActivityListener) {
    var ActivityName = /** @class */ (function () {
        function ActivityName() {
        }
        ActivityName.AppLaunch = "AppLaunch";
        ActivityName.AppUsageTime = "AppUsageTime";
        ActivityName.AppResume = "AppResume";
        return ActivityName;
    }());
    IActivityListener.ActivityName = ActivityName;
})(IActivityListener || (IActivityListener = {}));
module.exports = IActivityListener;

},{}],7:[function(require,module,exports){
"use strict";
var IFloodgateStorageProvider;
(function (IFloodgateStorageProvider) {
    /**
     * Enum for the files used by floodgate
     */
    var FileType;
    (function (FileType) {
        FileType[FileType["FloodgateSettings"] = 0] = "FloodgateSettings";
        FileType[FileType["SurveyActivationStats"] = 1] = "SurveyActivationStats";
        FileType[FileType["SurveyEventActivityStats"] = 2] = "SurveyEventActivityStats";
        FileType[FileType["CampaignDefinitions"] = 3] = "CampaignDefinitions";
        FileType[FileType["CampaignStates"] = 4] = "CampaignStates";
        FileType[FileType["GovernedChannelStates"] = 5] = "GovernedChannelStates";
    })(FileType = IFloodgateStorageProvider.FileType || (IFloodgateStorageProvider.FileType = {}));
})(IFloodgateStorageProvider || (IFloodgateStorageProvider = {}));
module.exports = IFloodgateStorageProvider;

},{}],8:[function(require,module,exports){
"use strict";
var IFloodgateStringProvider;
(function (IFloodgateStringProvider) {
    /**
     * Enum for the strings used by floodgate
     */
    var StringType;
    (function (StringType) {
        StringType[StringType["NpsPromptTitle"] = 0] = "NpsPromptTitle";
        StringType[StringType["NpsPromptQuestion"] = 1] = "NpsPromptQuestion";
        StringType[StringType["NpsPromptYesLabel"] = 2] = "NpsPromptYesLabel";
        StringType[StringType["NpsPromptNotNowLabel"] = 3] = "NpsPromptNotNowLabel";
        StringType[StringType["NpsRatingQuestion"] = 4] = "NpsRatingQuestion";
        StringType[StringType["Nps11RatingValue0"] = 5] = "Nps11RatingValue0";
        StringType[StringType["Nps11RatingValue1"] = 6] = "Nps11RatingValue1";
        StringType[StringType["Nps11RatingValue2"] = 7] = "Nps11RatingValue2";
        StringType[StringType["Nps11RatingValue3"] = 8] = "Nps11RatingValue3";
        StringType[StringType["Nps11RatingValue4"] = 9] = "Nps11RatingValue4";
        StringType[StringType["Nps11RatingValue5"] = 10] = "Nps11RatingValue5";
        StringType[StringType["Nps11RatingValue6"] = 11] = "Nps11RatingValue6";
        StringType[StringType["Nps11RatingValue7"] = 12] = "Nps11RatingValue7";
        StringType[StringType["Nps11RatingValue8"] = 13] = "Nps11RatingValue8";
        StringType[StringType["Nps11RatingValue9"] = 14] = "Nps11RatingValue9";
        StringType[StringType["Nps11RatingValue10"] = 15] = "Nps11RatingValue10";
        StringType[StringType["Nps5RatingValue1"] = 16] = "Nps5RatingValue1";
        StringType[StringType["Nps5RatingValue2"] = 17] = "Nps5RatingValue2";
        StringType[StringType["Nps5RatingValue3"] = 18] = "Nps5RatingValue3";
        StringType[StringType["Nps5RatingValue4"] = 19] = "Nps5RatingValue4";
        StringType[StringType["Nps5RatingValue5"] = 20] = "Nps5RatingValue5";
        StringType[StringType["NpsCommentQuestion"] = 21] = "NpsCommentQuestion";
        StringType[StringType["PsatPromptTitle"] = 22] = "PsatPromptTitle";
        StringType[StringType["PsatPromptQuestion"] = 23] = "PsatPromptQuestion";
        StringType[StringType["PsatPromptYesLabel"] = 24] = "PsatPromptYesLabel";
        StringType[StringType["PsatPromptNotNowLabel"] = 25] = "PsatPromptNotNowLabel";
        StringType[StringType["PsatRatingQuestion"] = 26] = "PsatRatingQuestion";
        StringType[StringType["PsatRatingValue1"] = 27] = "PsatRatingValue1";
        StringType[StringType["PsatRatingValue2"] = 28] = "PsatRatingValue2";
        StringType[StringType["PsatRatingValue3"] = 29] = "PsatRatingValue3";
        StringType[StringType["PsatRatingValue4"] = 30] = "PsatRatingValue4";
        StringType[StringType["PsatRatingValue5"] = 31] = "PsatRatingValue5";
        StringType[StringType["PsatCommentQuestion"] = 32] = "PsatCommentQuestion";
        StringType[StringType["BpsPromptTitle"] = 33] = "BpsPromptTitle";
        StringType[StringType["BpsPromptQuestion"] = 34] = "BpsPromptQuestion";
        StringType[StringType["BpsPromptYesLabel"] = 35] = "BpsPromptYesLabel";
        StringType[StringType["BpsPromptNotNowLabel"] = 36] = "BpsPromptNotNowLabel";
        StringType[StringType["BpsRatingQuestion"] = 37] = "BpsRatingQuestion";
        StringType[StringType["BpsRatingValue1"] = 38] = "BpsRatingValue1";
        StringType[StringType["BpsRatingValue2"] = 39] = "BpsRatingValue2";
        StringType[StringType["BpsCommentQuestion"] = 40] = "BpsCommentQuestion";
    })(StringType = IFloodgateStringProvider.StringType || (IFloodgateStringProvider.StringType = {}));
})(IFloodgateStringProvider || (IFloodgateStringProvider = {}));
module.exports = IFloodgateStringProvider;

},{}],9:[function(require,module,exports){
"use strict";
var IPromptComponent;
(function (IPromptComponent) {
    var PromptButton;
    (function (PromptButton) {
        PromptButton[PromptButton["Unselected"] = 0] = "Unselected";
        PromptButton[PromptButton["Yes"] = 1] = "Yes";
        PromptButton[PromptButton["No"] = 2] = "No";
    })(PromptButton = IPromptComponent.PromptButton || (IPromptComponent.PromptButton = {}));
})(IPromptComponent || (IPromptComponent = {}));
module.exports = IPromptComponent;

},{}],10:[function(require,module,exports){
"use strict";
var ISurvey;
(function (ISurvey) {
    var Type;
    (function (Type) {
        // A Feedback survey. Contains a single question with a free-form text response
        Type[Type["Feedback"] = 0] = "Feedback";
        // An NPS (net promoter score) survey. Asks user to rate "whether or not they would recommend this product to family/friends".
        // Contains a prompt, question, and rating
        Type[Type["Nps"] = 1] = "Nps";
        // A PSAT (product satisfaction) survey. Asks user to rate "overall, based on their experience, how satisifed are they with this app"
        // Contains a prompt, question, and rating
        Type[Type["Psat"] = 2] = "Psat";
        // A BPS (build promotion) survey. Asks user to choose between Yes and No options of promoting the current build to the next audience ring
        // Contains a prompt, question, and rating (Yes/No)
        Type[Type["Bps"] = 3] = "Bps";
        // A FPS (feature promotion) survey. Asks user to rate a given app feature.
        // Contains a prompt, question, and rating
        Type[Type["Fps"] = 4] = "Fps";
        // A NLQS (net language quality score) survey. Asks user to rate the language quality.
        // Contains a prompt, question, and rating
        Type[Type["Nlqs"] = 5] = "Nlqs";
    })(Type = ISurvey.Type || (ISurvey.Type = {}));
    ISurvey.DOM_FEEDBACKSURVEY_TAGNAME = "FeedbackSurvey";
    ISurvey.DOM_NPS_TAGNAME = "Nps";
    ISurvey.DOM_PSAT_TAGNAME = "Psat";
    ISurvey.DOM_BPS_TAGNAME = "Bps";
    ISurvey.DOM_FPS_TAGNAME = "Fps";
    ISurvey.DOM_NLQS_TAGNAME = "Nlqs";
})(ISurvey || (ISurvey = {}));
module.exports = ISurvey;

},{}],11:[function(require,module,exports){
"use strict";
var ISurveyComponent;
(function (ISurveyComponent) {
    var Type;
    (function (Type) {
        // A quick pop-up requesting participation in a survey
        Type[Type["Prompt"] = "Prompt"] = "Prompt";
        // A question paired with a free-form text response
        Type[Type["Comment"] = "Comment"] = "Comment";
        // A question asking for a selection from a list of allowed values with numeric meaning
        Type[Type["Rating"] = "Rating"] = "Rating";
    })(Type = ISurveyComponent.Type || (ISurveyComponent.Type = {}));
    ISurveyComponent.DOM_PROMPT_TAGNAME = "Prompt";
    ISurveyComponent.DOM_COMMENT_TAGNAME = "Comment";
    ISurveyComponent.DOM_RATING_TAGNAME = "Rating";
    ISurveyComponent.JSON_PROMPT_KEYNAME = "prompt";
    ISurveyComponent.JSON_COMMENT_KEYNAME = "comment";
    ISurveyComponent.JSON_RATING_KEYNAME = "rating";
})(ISurveyComponent || (ISurveyComponent = {}));
module.exports = ISurveyComponent;

},{}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var IFloodgateStorageProvider = require("../Api/IFloodgateStorageProvider");
var FloodgateEngine_1 = require("../FloodgateEngine");
var GovernedChannel_1 = require("../GovernedChannel");
var ISurveyInfo = require("../ISurveyInfo");
var Utils = require("../Utils");
// region Language Range
/**
 * Base class representing a language range in a campaign setting
 */
var CampaignLanguageRange = /** @class */ (function () {
    function CampaignLanguageRange() {
    }
    CampaignLanguageRange.deserialize = function (input) {
        var result;
        if (input && input.Type === 0) {
            result = CampaignLanguageRangeLanguageSubtag.deserialize(input);
        }
        if (result === undefined) {
            return null;
        }
        return result;
    };
    CampaignLanguageRange.prototype.validate = function () {
        return true;
    };
    return CampaignLanguageRange;
}());
exports.CampaignLanguageRange = CampaignLanguageRange;
/**
 * Represents a range matching on the "language subtag" against fully specified language tags, according to RFC 5646
 */
var CampaignLanguageRangeLanguageSubtag = /** @class */ (function (_super) {
    __extends(CampaignLanguageRangeLanguageSubtag, _super);
    // public for UT only
    function CampaignLanguageRangeLanguageSubtag() {
        return _super.call(this) || this;
    }
    CampaignLanguageRangeLanguageSubtag.deserialize = function (input) {
        var result = new CampaignLanguageRangeLanguageSubtag();
        if (input) {
            result.languageSubTag = input.Value;
        }
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    // @Override
    CampaignLanguageRangeLanguageSubtag.prototype.isInRange = function (language) {
        if (Utils.isNullOrUndefined(language)) {
            return false;
        }
        var extractedLanguageSubTag = Utils.extractLanguageSubtag(language);
        if (Utils.isNullOrUndefined(extractedLanguageSubTag)) {
            return false;
        }
        // compare strings ignoring case
        return extractedLanguageSubTag.toLocaleUpperCase() === this.languageSubTag.toLocaleUpperCase();
    };
    // @Override
    CampaignLanguageRangeLanguageSubtag.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        if (Utils.isNullOrUndefined(this.languageSubTag) || !Utils.isString(this.languageSubTag)) {
            return false;
        }
        // Reject any spec that isn't exactly a language subtag
        if (!Utils.isValidLanguageSubTag(this.languageSubTag)) {
            return false;
        }
        return true;
    };
    return CampaignLanguageRangeLanguageSubtag;
}(CampaignLanguageRange));
exports.CampaignLanguageRangeLanguageSubtag = CampaignLanguageRangeLanguageSubtag;
// endregion
// region Scope
var CampaignScope = /** @class */ (function () {
    function CampaignScope() {
    }
    CampaignScope.deserialize = function (input) {
        var result;
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        switch (input.Type) {
            case 0:
                result = CampaignScopeAny.deserialize(input);
                break;
            case 1:
                result = CampaignScopeEnvironmentCrossProduct.deserialize(input);
                break;
        }
        if (result === undefined) {
            return null;
        }
        return result;
    };
    CampaignScope.prototype.validate = function () {
        return true;
    };
    return CampaignScope;
}());
exports.CampaignScope = CampaignScope;
var CampaignScopeAny = /** @class */ (function (_super) {
    __extends(CampaignScopeAny, _super);
    // public for UT only
    function CampaignScopeAny() {
        return _super.call(this) || this;
    }
    CampaignScopeAny.deserialize = function (input) {
        return new CampaignScopeAny();
    };
    // @Override
    CampaignScopeAny.prototype.isInScope = function (environmentProvider) {
        return true;
    };
    // @Override
    CampaignScopeAny.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        return true;
    };
    return CampaignScopeAny;
}(CampaignScope));
exports.CampaignScopeAny = CampaignScopeAny;
var CampaignScopeEnvironmentCrossProduct = /** @class */ (function (_super) {
    __extends(CampaignScopeEnvironmentCrossProduct, _super);
    // public for UT only
    function CampaignScopeEnvironmentCrossProduct() {
        return _super.call(this) || this;
    }
    CampaignScopeEnvironmentCrossProduct.deserialize = function (input) {
        var result = new CampaignScopeEnvironmentCrossProduct();
        var languageRanges = [];
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        for (var key in input.Languages) {
            if (input.Languages.hasOwnProperty(key)) {
                var readRange = input.Languages[key];
                if (readRange) {
                    languageRanges.push(CampaignLanguageRange.deserialize(readRange));
                }
            }
        }
        if (languageRanges.length === 0) {
            languageRanges = null;
        }
        result.languageRanges = languageRanges;
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    // @Override
    CampaignScopeEnvironmentCrossProduct.prototype.isInScope = function (environmentProvider) {
        if (Utils.isNullOrUndefined(this.languageRanges)) {
            return true;
        }
        if (Utils.isNullOrUndefined(environmentProvider) || !environmentProvider.getLanguage()) {
            return false;
        }
        // If the environment matches a single pattern, then this is a yes
        for (var key in this.languageRanges) {
            if (this.languageRanges.hasOwnProperty(key)) {
                var range = this.languageRanges[key];
                if (range.isInRange(environmentProvider.getLanguage())) {
                    return true;
                }
            }
        }
        return false;
    };
    // @Override
    CampaignScopeEnvironmentCrossProduct.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        // Null languageRanges is allowed, means will match with everything.
        if (this.languageRanges) {
            for (var key in this.languageRanges) {
                if (this.languageRanges.hasOwnProperty(key) && !this.languageRanges[key]) {
                    return false;
                }
            }
        }
        return true;
    };
    return CampaignScopeEnvironmentCrossProduct;
}(CampaignScope));
exports.CampaignScopeEnvironmentCrossProduct = CampaignScopeEnvironmentCrossProduct;
// endregion
// region Durations
/**
 * Base class representing a duration in a campaign setting
 */
var CampaignDuration = /** @class */ (function () {
    function CampaignDuration() {
    }
    CampaignDuration.deserialize = function (input) {
        var result;
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        switch (input.Type) {
            case 0:
                result = CampaignDurationTimeInterval.deserialize(input);
                break;
            case 1:
                result = CampaignDurationSingleBuildChange.deserialize(input);
                break;
        }
        if (result === undefined) {
            return null;
        }
        return result;
    };
    CampaignDuration.prototype.validate = function () {
        return true;
    };
    return CampaignDuration;
}());
exports.CampaignDuration = CampaignDuration;
/**
 * A Duration expressed in seconds. UTC datetime comparisons are used to determine expiration.
 */
var CampaignDurationTimeInterval = /** @class */ (function (_super) {
    __extends(CampaignDurationTimeInterval, _super);
    // public for UT only
    function CampaignDurationTimeInterval() {
        return _super.call(this) || this;
    }
    CampaignDurationTimeInterval.deserialize = function (input) {
        var result = new CampaignDurationTimeInterval();
        if (input) {
            result.intervalSeconds = input.IntervalSeconds;
        }
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    // @Override
    CampaignDurationTimeInterval.prototype.asTimeIntervalSeconds = function () {
        return this.intervalSeconds;
    };
    // @Override
    CampaignDurationTimeInterval.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        if (!Utils.isNumber(this.intervalSeconds)) {
            return false;
        }
        return true;
    };
    return CampaignDurationTimeInterval;
}(CampaignDuration));
exports.CampaignDurationTimeInterval = CampaignDurationTimeInterval;
/**
 * A Duration representing exactly 1 change in build number
 */
var CampaignDurationSingleBuildChange = /** @class */ (function (_super) {
    __extends(CampaignDurationSingleBuildChange, _super);
    // public for UT only
    function CampaignDurationSingleBuildChange() {
        return _super.call(this) || this;
    }
    CampaignDurationSingleBuildChange.deserialize = function (input) {
        return new CampaignDurationSingleBuildChange();
    };
    // @Override
    CampaignDurationSingleBuildChange.prototype.asTimeIntervalSeconds = function () {
        return null;
    };
    return CampaignDurationSingleBuildChange;
}(CampaignDuration));
exports.CampaignDurationSingleBuildChange = CampaignDurationSingleBuildChange;
/**
 * Class representing AdditionalDataRequested in CampaignDefinition
 */
var CampaignAdditionalDataRequested = /** @class */ (function () {
    function CampaignAdditionalDataRequested() {
    }
    CampaignAdditionalDataRequested.deserialize = function (additionalDataRequested) {
        var result = new CampaignAdditionalDataRequested();
        if (!Utils.isNullOrUndefined(additionalDataRequested)) {
            // Convert from AdditionalDataRequested string to enum
            result.additionalData = [];
            for (var _i = 0, additionalDataRequested_1 = additionalDataRequested; _i < additionalDataRequested_1.length; _i++) {
                var additionalData = additionalDataRequested_1[_i];
                if (additionalData === "EmailAddress") {
                    result.additionalData.push(ISurveyInfo.AdditionalDataType.EmailAddress);
                }
            }
        }
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignAdditionalDataRequested.prototype.validate = function () {
        if (Utils.isNullOrUndefined(this.additionalData)) {
            return false;
        }
        return true;
    };
    return CampaignAdditionalDataRequested;
}());
exports.CampaignAdditionalDataRequested = CampaignAdditionalDataRequested;
// endregion
// region Distribution Schemes
var CampaignDistribution = /** @class */ (function () {
    function CampaignDistribution() {
    }
    CampaignDistribution.deserialize = function (input) {
        var result;
        if (input && input.Type === 0) {
            result = CampaignDistributionRamp.deserialize(input);
        }
        if (result === undefined) {
            return null;
        }
        return result;
    };
    CampaignDistribution.prototype.validate = function () {
        return true;
    };
    return CampaignDistribution;
}());
exports.CampaignDistribution = CampaignDistribution;
var CampaignDistributionRamp = /** @class */ (function (_super) {
    __extends(CampaignDistributionRamp, _super);
    function CampaignDistributionRamp() {
        return _super.call(this) || this;
    }
    CampaignDistributionRamp.deserialize = function (input) {
        var result = new CampaignDistributionRamp();
        if (input) {
            result.maxDelaySeconds = input.MaxDelaySeconds;
            result.chunks = input.Chunks;
        }
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    // @Override
    CampaignDistributionRamp.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        if (!Utils.isNumber(this.maxDelaySeconds) || this.maxDelaySeconds < 0) {
            return false;
        }
        if (!Utils.isNumber(this.chunks) || this.chunks < 0) {
            return false;
        }
        return true;
    };
    return CampaignDistributionRamp;
}(CampaignDistribution));
exports.CampaignDistributionRamp = CampaignDistributionRamp;
// endregion
// region Nomination Scheme
var CampaignNominationScheme = /** @class */ (function () {
    function CampaignNominationScheme() {
    }
    CampaignNominationScheme.deserialize = function (input) {
        var result;
        if (input && input.Type === 0) {
            result = CampaignNominationSchemeRatioPercentage.deserialize(input);
        }
        if (result === undefined) {
            return null;
        }
        return result;
    };
    /**
     * @return The amount of time the survey should be active, in seconds. Abstracts the difference between nominationPeriod and the fallback
     */
    CampaignNominationScheme.prototype.getActiveSurveyTimeIntervalSeconds = function () {
        var nominationTimIntervalSeconds = this.nominationPeriod.asTimeIntervalSeconds();
        if (Utils.isNumber(nominationTimIntervalSeconds)) {
            return nominationTimIntervalSeconds;
        }
        return this.fallbackSurveyDurationSeconds;
    };
    /**
     * @return The survey start time, possibly adjusted by an underlying DistributionModel.
     */
    CampaignNominationScheme.prototype.calculateSurveyStartTimeFromDate = function (soonestStartTime) {
        // No adjustment in base class.  Derived classes can override and implement delays like a "ramp"
        return soonestStartTime ? soonestStartTime : new Date();
    };
    /**
     * @return The survey expiration time, based on the nomination periods and the survey's adjusted start time
     */
    CampaignNominationScheme.prototype.calculateSurveyExpirationTimeFromSurveyStartTime = function (surveyStartTime) {
        surveyStartTime = surveyStartTime ? surveyStartTime : new Date();
        return Utils.addSecondsWithoutOverflow(surveyStartTime, this.getActiveSurveyTimeIntervalSeconds());
    };
    /**
     * @return The appropriate campaign cool down based on whether or not the user activated the survey
     */
    CampaignNominationScheme.prototype.getCampaignCooldown = function (didUserActivateSurvey) {
        if (didUserActivateSurvey) {
            return this.cooldownPeriod;
        }
        else {
            return this.nominationPeriod;
        }
    };
    CampaignNominationScheme.prototype.validate = function () {
        if (Utils.isNullOrUndefined(this.nominationPeriod)) {
            return false;
        }
        if (Utils.isNullOrUndefined(this.cooldownPeriod)) {
            this.cooldownPeriod = this.nominationPeriod;
        }
        if (!Utils.isNumber(this.nominationPeriod.asTimeIntervalSeconds())) {
            if (!Utils.isNumber(this.fallbackSurveyDurationSeconds) || this.fallbackSurveyDurationSeconds <= 0) {
                return false;
            }
        }
        return true;
    };
    return CampaignNominationScheme;
}());
exports.CampaignNominationScheme = CampaignNominationScheme;
/**
 * Class representing a set of campaign nomination rules to evaluate for in-scope campaigns:
 * percentage
 * re-election durations
 * distribution model (for "nominated" candidates)
 */
var CampaignNominationSchemeRatioPercentage = /** @class */ (function (_super) {
    __extends(CampaignNominationSchemeRatioPercentage, _super);
    function CampaignNominationSchemeRatioPercentage() {
        return _super.call(this) || this;
    }
    CampaignNominationSchemeRatioPercentage.deserialize = function (input) {
        var result = new CampaignNominationSchemeRatioPercentage();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        if (input.DistributionModel) {
            result.distributionModel = CampaignDistribution.deserialize(input.DistributionModel);
        }
        if (input.CooldownPeriod) {
            result.cooldownPeriod = CampaignDuration.deserialize(input.CooldownPeriod);
        }
        if (input.NominationPeriod) {
            result.nominationPeriod = CampaignDuration.deserialize(input.NominationPeriod);
        }
        result.fallbackSurveyDurationSeconds = input.FallbackSurveyDurationSeconds;
        result.percentageDenominator = input.PercentageDenominator;
        result.percentageNumerator = input.PercentageNumerator;
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    // @Override
    CampaignNominationSchemeRatioPercentage.prototype.evaluateNominationRules = function () {
        var rand = Math.random();
        // Creates a random number between [0 to (percentageDenominator - 1)]
        // In range [0 to (percentageDenominator - 1)] exactly 'percentageNumerator' values are < percentageNumerator
        return Math.floor(rand * this.percentageDenominator) < this.percentageNumerator;
    };
    // @Override
    CampaignNominationSchemeRatioPercentage.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        if (!Utils.isNumber(this.percentageDenominator) || !Utils.isNumber(this.percentageNumerator)) {
            return false;
        }
        if (this.percentageDenominator <= 0 || this.percentageNumerator < 0) {
            return false;
        }
        if (this.percentageNumerator > this.percentageDenominator) {
            return false;
        }
        // distribution model may be null
        return true;
    };
    return CampaignNominationSchemeRatioPercentage;
}(CampaignNominationScheme));
exports.CampaignNominationSchemeRatioPercentage = CampaignNominationSchemeRatioPercentage;
// endregion
// region Survey Event Definitions
var CampaignSurveyEvent = /** @class */ (function () {
    function CampaignSurveyEvent() {
    }
    CampaignSurveyEvent.deserialize = function (input) {
        var result;
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        switch (input.Type) {
            case 0:
                result = CampaignSurveyEventCountedActivity.deserialize(input);
                break;
            case 1:
                result = CampaignSurveyEventCountedActivitySequence.deserialize(input);
                break;
        }
        if (result === undefined) {
            return null;
        }
        return result;
    };
    CampaignSurveyEvent.prototype.validate = function () {
        return true;
    };
    return CampaignSurveyEvent;
}());
exports.CampaignSurveyEvent = CampaignSurveyEvent;
var CampaignSurveyEventCountedActivity = /** @class */ (function (_super) {
    __extends(CampaignSurveyEventCountedActivity, _super);
    // public for UT only
    function CampaignSurveyEventCountedActivity() {
        return _super.call(this) || this;
    }
    CampaignSurveyEventCountedActivity.deserialize = function (input) {
        var result = new CampaignSurveyEventCountedActivity();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.activity = input.Activity;
        result.count = input.Count;
        result.isAggregate = input.IsAggregate;
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    // @Override
    CampaignSurveyEventCountedActivity.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        if (Utils.isNullOrUndefined(this.activity) || !Utils.isString(this.activity)) {
            return false;
        }
        if (!Utils.isNumber(this.count) || this.count <= 0) {
            return false;
        }
        if (!Utils.isBoolean(this.isAggregate)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyEventCountedActivity;
}(CampaignSurveyEvent));
exports.CampaignSurveyEventCountedActivity = CampaignSurveyEventCountedActivity;
var CampaignSurveyEventCountedActivitySequence = /** @class */ (function (_super) {
    __extends(CampaignSurveyEventCountedActivitySequence, _super);
    // public for UT only
    function CampaignSurveyEventCountedActivitySequence() {
        return _super.call(this) || this;
    }
    CampaignSurveyEventCountedActivitySequence.deserialize = function (input) {
        var result = new CampaignSurveyEventCountedActivitySequence();
        var sequence = [];
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        for (var key in input.Sequence) {
            if (input.Sequence.hasOwnProperty(key)) {
                var readActivity = input.Sequence[key];
                if (readActivity) {
                    sequence.push(CampaignSurveyEventCountedActivity.deserialize(readActivity));
                }
            }
        }
        if (sequence.length === 0) {
            sequence = null;
        }
        result.sequence = sequence;
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    // @Override
    CampaignSurveyEventCountedActivitySequence.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        if (Utils.isNullOrUndefined(this.sequence)) {
            return false;
        }
        for (var key in this.sequence) {
            if (this.sequence.hasOwnProperty(key) && !this.sequence[key]) {
                return false;
            }
        }
        return true;
    };
    return CampaignSurveyEventCountedActivitySequence;
}(CampaignSurveyEvent));
exports.CampaignSurveyEventCountedActivitySequence = CampaignSurveyEventCountedActivitySequence;
// endregion
// region Survey Content Definitions
var CampaignSurveyContent = /** @class */ (function () {
    function CampaignSurveyContent() {
    }
    CampaignSurveyContent.deserialize = function (input) {
        var result = new CampaignSurveyContent();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.prompt = CampaignSurveyContentPrompt.deserialize(input.Prompt);
        result.rating = CampaignSurveyContentRating.deserialize(input.Rating);
        result.comment = CampaignSurveyContentComment.deserialize(input.Question);
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignSurveyContent.prototype.validate = function () {
        // both rating and comment are required - in sync with current version of mso implementation.
        if (Utils.isNullOrUndefined(this.prompt) || Utils.isNullOrUndefined(this.rating) || Utils.isNullOrUndefined(this.comment)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyContent;
}());
exports.CampaignSurveyContent = CampaignSurveyContent;
var CampaignSurveyContentPrompt = /** @class */ (function () {
    function CampaignSurveyContentPrompt() {
    }
    CampaignSurveyContentPrompt.deserialize = function (input) {
        var result = new CampaignSurveyContentPrompt();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.title = input.Title;
        result.question = input.Question;
        result.yesLabel = input.YesLabel;
        result.noLabel = input.NoLabel;
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignSurveyContentPrompt.prototype.validate = function () {
        if (Utils.isNullOrUndefined(this.title) || !Utils.isString(this.title) ||
            Utils.isNullOrUndefined(this.question) || !Utils.isString(this.question) ||
            Utils.isNullOrUndefined(this.yesLabel) || !Utils.isString(this.yesLabel) ||
            Utils.isNullOrUndefined(this.noLabel) || !Utils.isString(this.noLabel)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyContentPrompt;
}());
exports.CampaignSurveyContentPrompt = CampaignSurveyContentPrompt;
var CampaignSurveyContentRating = /** @class */ (function () {
    function CampaignSurveyContentRating() {
    }
    CampaignSurveyContentRating.deserialize = function (input) {
        var result = new CampaignSurveyContentRating();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.isZeroBased = input.IsZeroBased;
        result.question = input.Question;
        result.ratingValuesAscending = input.RatingValuesAscending;
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignSurveyContentRating.prototype.validate = function () {
        // expect ratingValuesAscending to contain between 2 to 11 values
        if (Utils.isNullOrUndefined(this.question) || !Utils.isString(this.question) ||
            Utils.isNullOrUndefined(this.ratingValuesAscending) || !Array.isArray(this.ratingValuesAscending) ||
            this.ratingValuesAscending.length < 2 || this.ratingValuesAscending.length > 11) {
            return false;
        }
        if (Utils.isNullOrUndefined(this.isZeroBased)) {
            // default to false if not provided
            this.isZeroBased = false;
        }
        else if (!Utils.isBoolean(this.isZeroBased)) {
            // fail validation if non boolean value is provided
            return false;
        }
        // expect all ratingValuesAscending values to be string
        for (var key in this.ratingValuesAscending) {
            if (this.ratingValuesAscending.hasOwnProperty(key)) {
                if (!Utils.isString(this.ratingValuesAscending[key])) {
                    return false;
                }
            }
        }
        return true;
    };
    return CampaignSurveyContentRating;
}());
exports.CampaignSurveyContentRating = CampaignSurveyContentRating;
var CampaignSurveyContentComment = /** @class */ (function () {
    function CampaignSurveyContentComment() {
    }
    CampaignSurveyContentComment.deserialize = function (input) {
        var result = new CampaignSurveyContentComment();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        // @SerializedName("Question")
        result.question = input.Question;
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignSurveyContentComment.prototype.validate = function () {
        if (Utils.isNullOrUndefined(this.question) || !Utils.isString(this.question)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyContentComment;
}());
exports.CampaignSurveyContentComment = CampaignSurveyContentComment;
// endregion
// region Survey Template definitions
var CampaignSurveyTemplate = /** @class */ (function () {
    function CampaignSurveyTemplate() {
    }
    CampaignSurveyTemplate.deserialize = function (input) {
        var result;
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        switch (input.Type) {
            case 0:
                result = CampaignSurveyTemplateNps5PointStatic.deserialize(input);
                break;
            case 1:
                result = CampaignSurveyTemplateNps11PointStatic.deserialize(input);
                break;
            case 2:
                result = CampaignSurveyTemplateFps.deserialize(input);
                break;
            case 3:
                result = CampaignSurveyTemplateNlqs.deserialize(input);
                break;
            case 4:
                result = CampaignSurveyTemplateNps.deserialize(input);
                break;
        }
        if (result === undefined) {
            return null;
        }
        return result;
    };
    CampaignSurveyTemplate.prototype.validate = function () {
        if (Utils.isNullOrUndefined(this.activationEvent)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyTemplate;
}());
exports.CampaignSurveyTemplate = CampaignSurveyTemplate;
var CampaignSurveyTemplateFps = /** @class */ (function (_super) {
    __extends(CampaignSurveyTemplateFps, _super);
    // public for UT only
    function CampaignSurveyTemplateFps() {
        return _super.call(this) || this;
    }
    CampaignSurveyTemplateFps.deserialize = function (input) {
        var result = new CampaignSurveyTemplateFps();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.activationEvent = CampaignSurveyEvent.deserialize(input.ActivationEvent);
        result.content = CampaignSurveyContent.deserialize(input.Content);
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignSurveyTemplateFps.prototype.validate = function () {
        if (!_super.prototype.validate.call(this) || Utils.isNullOrUndefined(this.content)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyTemplateFps;
}(CampaignSurveyTemplate));
exports.CampaignSurveyTemplateFps = CampaignSurveyTemplateFps;
var CampaignSurveyTemplateNlqs = /** @class */ (function (_super) {
    __extends(CampaignSurveyTemplateNlqs, _super);
    // public for UT only
    function CampaignSurveyTemplateNlqs() {
        return _super.call(this) || this;
    }
    CampaignSurveyTemplateNlqs.deserialize = function (input) {
        var result = new CampaignSurveyTemplateNlqs();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.activationEvent = CampaignSurveyEvent.deserialize(input.ActivationEvent);
        result.content = CampaignSurveyContent.deserialize(input.Content);
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignSurveyTemplateNlqs.prototype.validate = function () {
        if (!_super.prototype.validate.call(this) || Utils.isNullOrUndefined(this.content)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyTemplateNlqs;
}(CampaignSurveyTemplate));
exports.CampaignSurveyTemplateNlqs = CampaignSurveyTemplateNlqs;
var CampaignSurveyTemplateNps = /** @class */ (function (_super) {
    __extends(CampaignSurveyTemplateNps, _super);
    // public for UT only
    function CampaignSurveyTemplateNps() {
        return _super.call(this) || this;
    }
    CampaignSurveyTemplateNps.deserialize = function (input) {
        var result = new CampaignSurveyTemplateNps();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.activationEvent = CampaignSurveyEvent.deserialize(input.ActivationEvent);
        result.content = CampaignSurveyContent.deserialize(input.Content);
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignSurveyTemplateNps.prototype.validate = function () {
        if (!_super.prototype.validate.call(this) || Utils.isNullOrUndefined(this.content)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyTemplateNps;
}(CampaignSurveyTemplate));
exports.CampaignSurveyTemplateNps = CampaignSurveyTemplateNps;
var CampaignSurveyTemplateNps5PointStatic = /** @class */ (function (_super) {
    __extends(CampaignSurveyTemplateNps5PointStatic, _super);
    // public for UT only
    function CampaignSurveyTemplateNps5PointStatic() {
        return _super.call(this) || this;
    }
    CampaignSurveyTemplateNps5PointStatic.deserialize = function (input) {
        var result = new CampaignSurveyTemplateNps5PointStatic();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.activationEvent = CampaignSurveyEvent.deserialize(input.ActivationEvent);
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignSurveyTemplateNps5PointStatic.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyTemplateNps5PointStatic;
}(CampaignSurveyTemplate));
exports.CampaignSurveyTemplateNps5PointStatic = CampaignSurveyTemplateNps5PointStatic;
var CampaignSurveyTemplateNps11PointStatic = /** @class */ (function (_super) {
    __extends(CampaignSurveyTemplateNps11PointStatic, _super);
    function CampaignSurveyTemplateNps11PointStatic() {
        return _super.call(this) || this;
    }
    CampaignSurveyTemplateNps11PointStatic.deserialize = function (input) {
        var result = new CampaignSurveyTemplateNps11PointStatic();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.activationEvent = CampaignSurveyEvent.deserialize(input.ActivationEvent);
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignSurveyTemplateNps11PointStatic.prototype.validate = function () {
        if (!_super.prototype.validate.call(this)) {
            return false;
        }
        return true;
    };
    return CampaignSurveyTemplateNps11PointStatic;
}(CampaignSurveyTemplate));
exports.CampaignSurveyTemplateNps11PointStatic = CampaignSurveyTemplateNps11PointStatic;
// endregion
// region Campaign Definition
var CampaignDefinition = /** @class */ (function () {
    function CampaignDefinition() {
    }
    /**
     * Method to deserialize a JSON object to class object
     * @param input: JSON object
     * Returns result of validation check
     */
    CampaignDefinition.deserialize = function (input) {
        var result = new CampaignDefinition();
        if (Utils.isNullOrUndefined(input)) {
            return null;
        }
        result.campaignId = input.CampaignId;
        result.governedChannelType = input.GovernedChannelType;
        result.startTime = input.StartTimeUtc;
        result.endTime = input.EndTimeUtc;
        var additionalDataRequested = CampaignAdditionalDataRequested.deserialize(input.AdditionalDataRequested);
        result.additionalDataRequested = additionalDataRequested ? additionalDataRequested.additionalData : [];
        if (input.SurveyTemplate) {
            result.surveyTemplate = CampaignSurveyTemplate.deserialize(input.SurveyTemplate);
        }
        if (input.NominationScheme) {
            result.nominationScheme = CampaignNominationScheme.deserialize(input.NominationScheme);
        }
        if (input.Scope) {
            result.scope = CampaignScope.deserialize(input.Scope);
        }
        if (!result.validate()) {
            return null;
        }
        return result;
    };
    CampaignDefinition.prototype.validate = function () {
        if (Utils.isNullOrUndefined(this.scope)) {
            this.scope = new CampaignScopeAny();
        }
        if (Utils.isNullOrUndefined(this.campaignId) || !Utils.isString(this.campaignId)) {
            return false;
        }
        if (!Utils.isNumber(this.governedChannelType) || !Utils.isEnumValue(this.governedChannelType, GovernedChannel_1.GovernedChannelType)) {
            return false;
        }
        if (Utils.isNullOrUndefined(this.nominationScheme)) {
            return false;
        }
        if (Utils.isNullOrUndefined(this.surveyTemplate)) {
            return false;
        }
        // Campaigns with no start date are effectively disabled, in fact, this is the supported way to stage a definition but have it be turned off
        if (Utils.isNullOrUndefined(this.startTime)) {
            this.startTime = Utils.getDistantFuture();
        }
        else if (Utils.isUtcDatetimeString(this.startTime)) {
            this.startTime = Utils.stringToDate(this.startTime);
        }
        else {
            return false;
        }
        // Campaigns with no end date are effectively on indefinitely
        if (Utils.isNullOrUndefined(this.endTime)) {
            this.endTime = Utils.getDistantFuture();
        }
        else if (Utils.isUtcDatetimeString(this.endTime)) {
            this.endTime = Utils.stringToDate(this.endTime);
        }
        else {
            return false;
        }
        return true;
    };
    return CampaignDefinition;
}());
exports.CampaignDefinition = CampaignDefinition;
/**
 * Given an array of campaign definitions, returns the valid ones and errors if any are invalid.
 * @param input: JSON object
 * Returns the valid definitions and the error as string if any.
 */
function FilterValidCampaignDefinitions(campaignDefinitions) {
    var result = [];
    if (Utils.isNullOrUndefined(campaignDefinitions)) {
        return { result: result, error: "Empty" };
    }
    if (!Array.isArray(campaignDefinitions)) {
        return { result: result, error: "Not an array" };
    }
    var badIndexes = [];
    for (var i = 0; i < campaignDefinitions.length; i++) {
        var definition = campaignDefinitions[i];
        if (definition) {
            var newDefinition = CampaignDefinition.deserialize(definition);
            newDefinition
                ? result.push(newDefinition)
                : badIndexes.push(i);
        }
        else {
            badIndexes.push(i);
        }
    }
    var error = badIndexes.length > 0 ? "Invalid campaign definitions at indexes: " + badIndexes.toString() : undefined;
    return { result: result, error: error };
}
exports.FilterValidCampaignDefinitions = FilterValidCampaignDefinitions;
var FileSystemCampaignDefinitionProvider = /** @class */ (function () {
    function FileSystemCampaignDefinitionProvider(storage) {
        if (Utils.isNullOrUndefined(storage)) {
            throw new Error("storage must not be null");
        }
        this.storage = storage;
    }
    FileSystemCampaignDefinitionProvider.prototype.load = function () {
        var definitionString = this.storage.read(IFloodgateStorageProvider.FileType.CampaignDefinitions);
        if (Utils.isNullOrUndefined(definitionString)) {
            return [];
        }
        var readDefinitions;
        try {
            readDefinitions = JSON.parse(definitionString);
        }
        catch (e) {
            FloodgateEngine_1.FloodgateEngine.getTelemetryLogger().log_CampaignLoad_Failed(e.toString());
            return [];
        }
        // This ignores errors in validation for now.
        return FilterValidCampaignDefinitions(readDefinitions).result;
    };
    return FileSystemCampaignDefinitionProvider;
}());
exports.FileSystemCampaignDefinitionProvider = FileSystemCampaignDefinitionProvider;

},{"../Api/IFloodgateStorageProvider":7,"../FloodgateEngine":16,"../GovernedChannel":18,"../ISurveyInfo":22,"../Utils":36}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("../Utils");
var CampaignDefinitionProvider_1 = require("./CampaignDefinitionProvider");
var CampaignStateProvider_1 = require("./CampaignStateProvider");
var CampaignSurveyFactory_1 = require("./CampaignSurveyFactory");
/**
 * The standard campaign manager implementation.
 */
var CampaignManager = /** @class */ (function () {
    function CampaignManager(stateProvider, definitionProvider, stringProvider, environmentProvider, currentBuildNumber, currentDate) {
        if (!stateProvider) {
            throw new Error("stateProvider must not be null");
        }
        if (!definitionProvider) {
            throw new Error("definitionProvider must not be null");
        }
        if (!stringProvider) {
            throw new Error("stringProvider must not be null");
        }
        if (Utils.isNullOrUndefined(currentBuildNumber)) {
            throw new Error("currentBuildNumber must not be null");
        }
        this.campaignStates = {};
        this.campaignDefinitions = {};
        this.stateProvider = stateProvider;
        this.definitionProvider = definitionProvider;
        this.stringProvider = stringProvider;
        this.environmentProvider = environmentProvider; // Can be null
        this.currentBuildNumber = currentBuildNumber;
        currentDate = currentDate ? currentDate : new Date();
        // TODO check "after test refactoring - remove this and rely on a call to "refresh" to do this work"
        this.refreshSurveyDefinitionsPrivate(null, currentDate);
    }
    CampaignManager.isStateUpForNomination = function (state, definition, date, buildNumber) {
        if (!state || !definition) {
            return false;
        }
        date = date ? date : new Date();
        // Check manual override
        if (state.ForceCandidacy) {
            return true;
        }
        // Figure out which duration we're using based on whether or not the user triggered the survey
        var campaignCooldownDuration = definition.nominationScheme.getCampaignCooldown(state.IsCandidate && state.DidCandidateTriggerSurvey);
        if (!campaignCooldownDuration) {
            return false;
        }
        // First check for build-based rules. Eventually this could get more complex if we supported counting differently seen build numbers
        if (CampaignManager.hasBuildChangeDurationElapsed(campaignCooldownDuration, state.LastNominationBuildNumber, buildNumber)) {
            return true;
        }
        // Next check date rules
        return CampaignManager.hasTimeIntervalDurationElapsed(campaignCooldownDuration, state.getCooldownStartDate(), date);
    };
    CampaignManager.isDateInRange = function (date, startDate, endDate) {
        date = date ? date : new Date();
        startDate = startDate ? startDate : Utils.getDistantPast();
        endDate = endDate ? endDate : Utils.getDistantFuture();
        // Check Start/Expire date range
        if (startDate.getTime() <= date.getTime() && endDate.getTime() >= date.getTime()) {
            return true;
        }
        return false;
    };
    CampaignManager.hasTimeIntervalDurationElapsed = function (duration, startDate, date) {
        if (Utils.isNullOrUndefined(duration) || !(duration instanceof CampaignDefinitionProvider_1.CampaignDurationTimeInterval)) {
            return false;
        }
        if (!startDate || !date) {
            return false;
        }
        var endDate = Utils.addSecondsWithoutOverflow(startDate, duration.intervalSeconds);
        return date.getTime() >= endDate.getTime();
    };
    CampaignManager.hasBuildChangeDurationElapsed = function (duration, startBuild, build) {
        if (Utils.isNullOrUndefined(duration) || !(duration instanceof CampaignDefinitionProvider_1.CampaignDurationSingleBuildChange)) {
            return false;
        }
        if (Utils.isNullOrUndefined(startBuild) || Utils.isNullOrUndefined(build)) {
            return (startBuild === null) !== (build === null);
        }
        return !(startBuild === build);
    };
    CampaignManager.isCampaignInScope = function (definition, date, environmentProvider) {
        if (!definition) {
            return false;
        }
        date = date ? date : new Date();
        // Check Start/Expire date range
        if (!CampaignManager.isDateInRangeWithDefinition(date, definition)) {
            return false;
        }
        if (definition.scope) {
            if (!definition.scope.isInScope(environmentProvider)) {
                return false;
            }
        }
        // If we get here, the definition is relevant
        return true;
    };
    CampaignManager.isDateInRangeWithDefinition = function (date, definition) {
        if (!definition) {
            return false;
        }
        date = date ? date : new Date();
        return CampaignManager.isDateInRange(date, 
        // null start dates should be impossible, but if set, should mean the campaign is disabled
        definition.startTime ? definition.startTime : Utils.getDistantFuture(), definition.endTime);
    };
    // @Override
    CampaignManager.prototype.getActiveSurveys = function () {
        var surveys = {};
        for (var key in this.campaignStates) {
            if (this.campaignStates.hasOwnProperty(key)) {
                var state = this.campaignStates[key];
                if (!state.IsCandidate) {
                    continue;
                }
                // This is a requirement because we keep some otherwise "stale" campaigns around for the save routine
                var definition = this.campaignDefinitions[state.CampaignId];
                if (!definition) {
                    continue;
                }
                var survey = CampaignSurveyFactory_1.CampaignSurveyFactory.makeSurvey(state, definition.governedChannelType, definition.surveyTemplate, this.stringProvider, definition.additionalDataRequested);
                if (!survey) {
                    continue;
                }
                surveys[survey.getSurveyInfo().getId()] = survey;
            }
        }
        return surveys;
    };
    // @Override
    CampaignManager.prototype.onCampaignSurveyActivated = function (campaignId, takenDate) {
        var state = this.campaignStates[campaignId];
        if (!state) {
            return;
        }
        takenDate = takenDate ? takenDate : new Date();
        state.markCurrentSurveyTakenOnDate(takenDate);
        this.saveCampaignState();
    };
    CampaignManager.prototype.getCampaignStates = function () {
        return this.campaignStates;
    };
    CampaignManager.prototype.getCampaignDefinitions = function () {
        return this.campaignDefinitions;
    };
    // region ISurveyClient methods
    // @Override
    CampaignManager.prototype.onSurveyActivated = function (surveyInfo) {
        if (!surveyInfo) {
            return;
        }
        this.onCampaignSurveyActivated(surveyInfo.getBackEndId(), new Date());
    };
    // @Override
    CampaignManager.prototype.refreshSurveyDefinitions = function (channelTypes) {
        this.refreshSurveyDefinitionsPrivate(channelTypes, new Date());
    };
    // @Override
    CampaignManager.prototype.getAppSurveys = function () {
        return this.getActiveSurveys();
    };
    // endregion
    CampaignManager.prototype.refreshSurveyDefinitionsPrivate = function (channelTypes, date) {
        this.campaignStates = {};
        this.campaignDefinitions = {};
        this.loadAndFilterCampaignData(date, channelTypes);
        this.evaluateCampaigns(date);
        this.saveCampaignState();
    };
    /**
     * Load and filter the campaigns definitions and states
     */
    CampaignManager.prototype.loadAndFilterCampaignData = function (currentDate, channelTypes) {
        currentDate = currentDate ? currentDate : new Date();
        var loadedDefinitionsMap = {};
        var loadedDefinitions = this.definitionProvider.load();
        // Load filtered campaign definitions
        for (var key in loadedDefinitions) {
            if (loadedDefinitions.hasOwnProperty(key)) {
                var definition = loadedDefinitions[key];
                loadedDefinitionsMap[definition.campaignId] = definition;
                if (channelTypes && (channelTypes.indexOf(definition.governedChannelType) < 0)) {
                    continue;
                }
                if (!CampaignManager.isCampaignInScope(definition, currentDate, this.environmentProvider)) {
                    continue;
                }
                this.campaignDefinitions[definition.campaignId] = definition;
            }
        }
        // Load campaign state, filtering out the expired definitions
        var loadedStates = this.stateProvider.load();
        var staleLoadedStates = [];
        for (var key in loadedStates) {
            if (loadedStates.hasOwnProperty(key)) {
                var state = loadedStates[key];
                if (!this.campaignDefinitions.hasOwnProperty(state.CampaignId)) {
                    staleLoadedStates.push(state);
                }
                this.campaignStates[state.CampaignId] = state;
            }
        }
        /*
         * Stale State data cleanup
         * State needs to be cleaned up when:
         * 1) The campaign has expired
         * 2) The campaign is no longer present in the definitions (think ECS or other outages or very old expirations)
         *    In this case the state should still be cleaned up on it's reelection date
         * 3) When the user is out of scope (for an otherwise active campaign) and is up for nomination

         * This optimizes the user experience in case the campaign pops up or gets renewed when we would have preferred the user remain in cool down

         * 2&3 are basically the same, and 1 is a special case optimization on top of 2&3 for earlier clean up

         * To do 2 & 3, we just look at states with no matching definition (after filtering), and reject them if they are past their nomination period
         * To do 1, we just need to keep a list/hash of the definitions that we filtered out this load cycle, specifically for expiration dates, and bypass
         * the cool down "wait" for these specifically

         * For now, allowing some "grace" for "missing"/"blippy" campaign definitions (in case they pop in and out of ECS) by deferring missing
         * deletion by a delay-time specified by the original campaign.
         */
        for (var key in staleLoadedStates) {
            if (staleLoadedStates.hasOwnProperty(key)) {
                var state = staleLoadedStates[key];
                if (!state) {
                    continue;
                }
                var definition = loadedDefinitionsMap[state.CampaignId];
                var shouldRemove = false;
                if (!definition) {
                    if (state.LastNominationTimeUtc.getTime() <= Utils.subtractSecondsWithoutOverflow(currentDate, state.DeleteAfterSecondsWhenStale).getTime()) {
                        shouldRemove = true;
                    }
                }
                else if (CampaignManager.isStateUpForNomination(state, definition, currentDate, this.currentBuildNumber)) {
                    shouldRemove = true;
                }
                // The next time we write to storage, these will be removed
                if (shouldRemove) {
                    delete this.campaignStates[state.CampaignId];
                }
            }
        }
    };
    /**
     * Given the loaded campaign definitions and states from previous sessions, run anything up for nomination
     */
    CampaignManager.prototype.evaluateCampaigns = function (currentDate) {
        // Loop through campaigns definitions, and update their state if necessary
        currentDate = currentDate ? currentDate : new Date();
        for (var key in this.campaignDefinitions) {
            if (this.campaignDefinitions.hasOwnProperty(key)) {
                var definition = this.campaignDefinitions[key];
                var state = this.campaignStates[definition.campaignId];
                if (!state || CampaignManager.isStateUpForNomination(state, definition, currentDate, this.currentBuildNumber)) {
                    var lastSurveyId = state ? state.LastSurveyId : "";
                    var lastSurveyStartTime = state ? state.LastSurveyStartTimeUtc : Utils.getDistantPast();
                    var lastSurveyExpirationTime = state ? state.LastSurveyExpirationTimeUtc : Utils.getDistantPast();
                    var lastSurveyActivatedTime = state ? state.LastSurveyActivatedTimeUtc : Utils.getDistantPast();
                    // Run the nomination
                    var isCandidate = (state && state.ForceCandidacy) || definition.nominationScheme.evaluateNominationRules();
                    if (isCandidate) {
                        // Make new survey properties for the next call to get the active surveys
                        lastSurveyId = Utils.guid();
                        lastSurveyStartTime = definition.nominationScheme.calculateSurveyStartTimeFromDate(currentDate);
                        lastSurveyExpirationTime = definition.nominationScheme.calculateSurveyExpirationTimeFromSurveyStartTime(lastSurveyStartTime);
                    }
                    var newState = new CampaignStateProvider_1.CampaignState(definition.campaignId, currentDate, this.currentBuildNumber, definition.nominationScheme.getActiveSurveyTimeIntervalSeconds(), false, isCandidate, false, lastSurveyActivatedTime, lastSurveyId, lastSurveyStartTime, lastSurveyExpirationTime);
                    // Save the new state to our local cache
                    this.campaignStates[newState.CampaignId] = newState;
                }
            }
        }
    };
    CampaignManager.prototype.saveCampaignState = function () {
        // Sort by campaignId, ascending for uniformity
        var states = Utils.makeArrayFromObjectValuesSortedByKeyString(this.campaignStates);
        this.stateProvider.save(states);
    };
    return CampaignManager;
}());
exports.CampaignManager = CampaignManager;

},{"../Utils":36,"./CampaignDefinitionProvider":12,"./CampaignStateProvider":14,"./CampaignSurveyFactory":15}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IFloodgateStorageProvider = require("../Api/IFloodgateStorageProvider");
var Utils = require("../Utils");
var CampaignState = /** @class */ (function () {
    function CampaignState(campaignId, lastNominationTime, lastNominationBuildNumber, deleteAfterSecondsWhenStale, ForceCandidacy, isCandidate, didCandidateTriggerSurvey, lastSurveyActivatedTime, lastSurveyId, lastSurveyStartTime, lastSurveyExpirationTime) {
        this.CampaignId = campaignId;
        this.LastNominationTimeUtc = lastNominationTime;
        this.LastNominationBuildNumber = lastNominationBuildNumber;
        this.DeleteAfterSecondsWhenStale = deleteAfterSecondsWhenStale;
        this.ForceCandidacy = ForceCandidacy;
        this.IsCandidate = isCandidate;
        this.DidCandidateTriggerSurvey = didCandidateTriggerSurvey;
        this.LastSurveyActivatedTimeUtc = lastSurveyActivatedTime;
        this.LastSurveyId = lastSurveyId;
        this.LastSurveyStartTimeUtc = lastSurveyStartTime;
        this.LastSurveyExpirationTimeUtc = lastSurveyExpirationTime;
        if (!this.validate()) {
            throw new Error("Constructor arguments are not valid");
        }
    }
    /**
     * Method to deserialize a JSON object to class object
     * @param input: JSON object
     * Returns class object
     */
    CampaignState.deserialize = function (input) {
        var result;
        if (!input) {
            return null;
        }
        try {
            result = new CampaignState(input.CampaignId, input.LastNominationTimeUtc, input.LastNominationBuildNumber, input.DeleteAfterSecondsWhenStale, false, // ForceCandidacy
            input.IsCandidate, input.DidCandidateTriggerSurvey, input.LastSurveyActivatedTimeUtc, input.LastSurveyId, input.LastSurveyStartTimeUtc, input.LastSurveyExpirationTimeUtc);
        }
        catch (e) {
            // TODO(gachoi) Log parsing failed
            return null;
        }
        return result;
    };
    CampaignState.prototype.validate = function () {
        if (!this.CampaignId || !Utils.isString(this.CampaignId)) {
            return false;
        }
        if (Utils.isNullOrUndefined(this.LastNominationBuildNumber)
            || !Utils.isString(this.LastNominationBuildNumber)) {
            return false;
        }
        if (!Utils.isNumber(this.DeleteAfterSecondsWhenStale) || this.DeleteAfterSecondsWhenStale < 0) {
            return false;
        }
        if (!Utils.isBoolean(this.IsCandidate) || !Utils.isBoolean(this.DidCandidateTriggerSurvey)) {
            return false;
        }
        if (this.IsCandidate) {
            // Disallow the following null's if isCandidate == true
            if (Utils.isNullOrUndefined(this.LastSurveyStartTimeUtc) || Utils.isNullOrUndefined(this.LastSurveyExpirationTimeUtc)) {
                return false;
            }
            // LastSurveyId could be ""
            if (!Utils.isString(this.LastSurveyId)) {
                return false;
            }
        }
        if (this.DidCandidateTriggerSurvey) {
            // Disallow the following null's if didCandidateTriggerSurvey == true
            if (Utils.isNullOrUndefined(this.LastSurveyActivatedTimeUtc)) {
                return false;
            }
        }
        if (Utils.isNullOrUndefined(this.LastSurveyId)) {
            this.LastSurveyId = "";
        }
        else if (!Utils.isString(this.LastSurveyId)) {
            return false;
        }
        // LastNominationTime does not allow null
        if (Utils.isUtcDatetimeString(this.LastNominationTimeUtc)) {
            this.LastNominationTimeUtc = Utils.stringToDate(this.LastNominationTimeUtc);
            // invalidate if it's not a Date object
        }
        else if (!Utils.isDate(this.LastNominationTimeUtc)) {
            return false;
        }
        // Set value to distance past if value not provided
        if (Utils.isNullOrUndefined(this.LastSurveyActivatedTimeUtc)) {
            this.LastSurveyActivatedTimeUtc = Utils.getDistantPast();
            // check if it's UTC date time string, possibly coming from deserialize method
        }
        else if (Utils.isUtcDatetimeString(this.LastSurveyActivatedTimeUtc)) {
            this.LastSurveyActivatedTimeUtc = Utils.stringToDate(this.LastSurveyActivatedTimeUtc);
            // invalidate if it's not a Date object
        }
        else if (!Utils.isDate(this.LastSurveyActivatedTimeUtc)) {
            return false;
        }
        // Set value to distance past if value not provided
        if (Utils.isNullOrUndefined(this.LastSurveyStartTimeUtc)) {
            this.LastSurveyStartTimeUtc = Utils.getDistantPast();
            // check if it's string, possibly coming from deserialize method
        }
        else if (Utils.isUtcDatetimeString(this.LastSurveyStartTimeUtc)) {
            this.LastSurveyStartTimeUtc = Utils.stringToDate(this.LastSurveyStartTimeUtc);
            // invalidate if it's not a Date object
        }
        else if (!Utils.isDate(this.LastSurveyStartTimeUtc)) {
            return false;
        }
        // Set value to distance past if value not provided
        if (Utils.isNullOrUndefined(this.LastSurveyExpirationTimeUtc)) {
            this.LastSurveyExpirationTimeUtc = Utils.getDistantPast();
            // check if it's string, possibly coming from deserialize method
        }
        else if (Utils.isUtcDatetimeString(this.LastSurveyExpirationTimeUtc)) {
            this.LastSurveyExpirationTimeUtc = Utils.stringToDate(this.LastSurveyExpirationTimeUtc);
        }
        else if (!Utils.isDate(this.LastSurveyExpirationTimeUtc)) {
            return false;
        }
        return true;
    };
    /**
     * Record that the current survey was taken on this date
     *
     * @param date date
     */
    CampaignState.prototype.markCurrentSurveyTakenOnDate = function (date) {
        this.DidCandidateTriggerSurvey = true;
        this.LastSurveyActivatedTimeUtc = date != null ? date : new Date();
    };
    CampaignState.prototype.getCooldownStartDate = function () {
        if (!this.IsCandidate) {
            return this.LastNominationTimeUtc;
        }
        if (this.DidCandidateTriggerSurvey) {
            return this.LastSurveyActivatedTimeUtc;
        }
        // In practice this wil be equal to lastNominationTime, but
        // distribution models like a ramp effectively cause us to
        // shift our "effective nomination date" forward with the survey start date
        return this.LastSurveyStartTimeUtc;
    };
    return CampaignState;
}());
exports.CampaignState = CampaignState;
/**
 * Class representing what is stored in the file.
 */
var FileData = /** @class */ (function () {
    function FileData() {
    }
    return FileData;
}());
var FileBasedCampaignStateProvider = /** @class */ (function () {
    function FileBasedCampaignStateProvider(storage) {
        if (!storage) {
            throw new Error("storage must not be null");
        }
        this.storage = storage;
    }
    // @Override
    FileBasedCampaignStateProvider.prototype.load = function () {
        var readString = this.storage.read(IFloodgateStorageProvider.FileType.CampaignStates);
        if (!readString) {
            return [];
        }
        var fileData;
        try {
            fileData = JSON.parse(readString);
        }
        catch (e) {
            // TODO(gachoi) Log parsing failed
            return [];
        }
        var result = [];
        if (fileData && fileData.CampaignStates) {
            fileData.CampaignStates.forEach(function (state) {
                var newState = CampaignState.deserialize(state);
                if (newState) {
                    result.push(newState);
                }
            });
        }
        return result;
    };
    // @Override
    FileBasedCampaignStateProvider.prototype.save = function (campaignStates) {
        if (!campaignStates) {
            return;
        }
        var fileData = new FileData();
        fileData.CampaignStates = campaignStates;
        var writeString = JSON.stringify(fileData);
        this.storage.write(IFloodgateStorageProvider.FileType.CampaignStates, writeString);
    };
    return FileBasedCampaignStateProvider;
}());
exports.FileBasedCampaignStateProvider = FileBasedCampaignStateProvider;

},{"../Api/IFloodgateStorageProvider":7,"../Utils":36}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SurveyEvents_1 = require("../SurveyEvents");
var FpsSurvey = require("../Surveys/FpsSurvey");
var NlqsSurvey = require("../Surveys/NlqsSurvey");
var NpsSurvey = require("../Surveys/NpsSurvey");
var SurveyDataSource = require("../Surveys/SurveyDataSource");
var Utils = require("../Utils");
var CampaignDefinitionProvider_1 = require("./CampaignDefinitionProvider");
/**
 * Contains methods to take a campaign definition + state and generate an ISurvey
 */
var CampaignSurveyFactory = /** @class */ (function () {
    function CampaignSurveyFactory() {
    }
    // region Survey methods
    CampaignSurveyFactory.makeSurvey = function (state, governedChannelType, surveyModel, stringProvider, additionalDataRequested) {
        if (!state || !surveyModel || !stringProvider) {
            return null;
        }
        if (surveyModel instanceof CampaignDefinitionProvider_1.CampaignSurveyTemplateNps5PointStatic) {
            return NpsSurvey.make5Point(CampaignSurveyFactory.makeSurveyDataSourceData(state, governedChannelType, surveyModel, additionalDataRequested), stringProvider);
        }
        else if (surveyModel instanceof CampaignDefinitionProvider_1.CampaignSurveyTemplateNps11PointStatic) {
            return NpsSurvey.make11Point(CampaignSurveyFactory.makeSurveyDataSourceData(state, governedChannelType, surveyModel, additionalDataRequested), stringProvider);
        }
        else if (surveyModel instanceof CampaignDefinitionProvider_1.CampaignSurveyTemplateFps) {
            return FpsSurvey.makeFps(CampaignSurveyFactory.makeSurveyDataSourceData(state, governedChannelType, surveyModel, additionalDataRequested), stringProvider, surveyModel);
        }
        else if (surveyModel instanceof CampaignDefinitionProvider_1.CampaignSurveyTemplateNlqs) {
            return NlqsSurvey.makeNlqs(CampaignSurveyFactory.makeSurveyDataSourceData(state, governedChannelType, surveyModel, additionalDataRequested), stringProvider, surveyModel);
        }
        else if (surveyModel instanceof CampaignDefinitionProvider_1.CampaignSurveyTemplateNps) {
            return NpsSurvey.makeCustom(CampaignSurveyFactory.makeSurveyDataSourceData(state, governedChannelType, surveyModel, additionalDataRequested), stringProvider, surveyModel);
        }
        else {
            return null;
        }
    };
    CampaignSurveyFactory.makeSurveyDataSourceData = function (state, governedChannelType, surveyModel, additionalDataRequested) {
        if (!state || !surveyModel) {
            return null;
        }
        var surveyData = new SurveyDataSource.SurveyDataSourceData();
        surveyData.activationEvent = CampaignSurveyFactory.makeEvent(state, surveyModel.activationEvent);
        surveyData.id = state.LastSurveyId;
        surveyData.backEndIdentifier = state.CampaignId;
        surveyData.expirationTimeUtc = Utils.dateToShortUtcString(state.LastSurveyExpirationTimeUtc);
        surveyData.governedChannelType = governedChannelType;
        surveyData.startTimeUtc = Utils.dateToShortUtcString(state.LastSurveyStartTimeUtc);
        surveyData.additionalDataRequested = additionalDataRequested || [];
        return surveyData;
    };
    // endregion
    // region Event methods
    CampaignSurveyFactory.makeCountedActivityEventData = function (eventModel) {
        if (!eventModel) {
            return null;
        }
        var eventData = new SurveyEvents_1.CountedActivityEventData();
        eventData.activity = eventModel.activity;
        eventData.count = eventModel.count;
        eventData.isAggregate = eventModel.isAggregate;
        return eventData;
    };
    CampaignSurveyFactory.makeCountedActivityEvent = function (state, eventModel) {
        if (!state || !eventModel) {
            return null;
        }
        var eventData = CampaignSurveyFactory.makeCountedActivityEventData(eventModel);
        if (!eventData) {
            return null;
        }
        return new SurveyEvents_1.CountedActivityEvent(eventData);
    };
    CampaignSurveyFactory.makeCountedActivitySequenceEvent = function (state, eventModel) {
        if (!state || !eventModel) {
            return null;
        }
        var sequenceEventData = new SurveyEvents_1.CountedActivitySequenceEventData();
        sequenceEventData.sequence = [];
        for (var _i = 0, _a = eventModel.sequence; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            var eventData = CampaignSurveyFactory.makeCountedActivityEventData(event_1);
            if (!eventData) {
                return null;
            }
            sequenceEventData.sequence.push(eventData);
        }
        return new SurveyEvents_1.CountedActivitySequenceEvent(sequenceEventData);
    };
    CampaignSurveyFactory.makeEvent = function (state, eventModel) {
        if (eventModel instanceof CampaignDefinitionProvider_1.CampaignSurveyEventCountedActivity) {
            return CampaignSurveyFactory.makeCountedActivityEvent(state, eventModel);
        }
        else if (eventModel instanceof CampaignDefinitionProvider_1.CampaignSurveyEventCountedActivitySequence) {
            return CampaignSurveyFactory.makeCountedActivitySequenceEvent(state, eventModel);
        }
        else {
            return null;
        }
    };
    return CampaignSurveyFactory;
}());
exports.CampaignSurveyFactory = CampaignSurveyFactory;

},{"../SurveyEvents":28,"../Surveys/FpsSurvey":32,"../Surveys/NlqsSurvey":33,"../Surveys/NpsSurvey":34,"../Surveys/SurveyDataSource":35,"../Utils":36,"./CampaignDefinitionProvider":12}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IFloodgateStorageProvider = require("./Api/IFloodgateStorageProvider");
var CampaignDefinitionProvider_1 = require("./Campaign/CampaignDefinitionProvider");
var CampaignManager_1 = require("./Campaign/CampaignManager");
var CampaignStateProvider_1 = require("./Campaign/CampaignStateProvider");
var FloodgateSettings_1 = require("./FloodgateSettings");
var GovernedChannelStateProvider_1 = require("./GovernedChannelStateProvider");
var Governor_1 = require("./Governor");
var SurveyActivityListener = require("./SurveyActivityListener");
var SurveyStatCollectionActivation_1 = require("./SurveyStatCollectionActivation");
var SurveyStatCollectionEventActivity_1 = require("./SurveyStatCollectionEventActivity");
// Telemetry logger with no-op logger
var DefaultFloodgateTelemetryLogger = /** @class */ (function () {
    function DefaultFloodgateTelemetryLogger() {
    }
    // @Override
    DefaultFloodgateTelemetryLogger.prototype.log_TriggerMet = function (campaignId, surveyId, surveyType) { };
    // @Override
    DefaultFloodgateTelemetryLogger.prototype.log_UserSelected = function (campaignId, surveyId, surveyType) { };
    // @Override
    DefaultFloodgateTelemetryLogger.prototype.log_CampaignLoad_Failed = function (errorMessage) { };
    return DefaultFloodgateTelemetryLogger;
}());
/**
 * Floodgate Engine class.  The main wiring hub and the brains responsible for
 * linking together the survey definitions, governance, activity tracking, and
 * survey launchers.  Only one-instance-at-a-time of these should be created
 * per app session.
 */
var FloodgateEngine = /** @class */ (function () {
    function FloodgateEngine(surveyClient, activityListener, launcherFactory, onSurveyActivatedCallback, storage, governor) {
        this.candidateSurveys = {};
        this.launchedSurveys = {};
        this.launchedLaunchers = [];
        if (!surveyClient) {
            throw new Error("surveyClient must not be null");
        }
        if (!activityListener) {
            throw new Error("activityListener must not be null");
        }
        if (!launcherFactory) {
            throw new Error("launcherFactory must not be null");
        }
        if (!onSurveyActivatedCallback) {
            throw new Error("onSurveyActivatedCallback must not be null");
        }
        if (!storage) {
            throw new Error("storage must not be null");
        }
        if (!governor) {
            throw new Error("governor must not be null");
        }
        this.surveyClient = surveyClient;
        this.activityListener = activityListener;
        this.launcherFactory = launcherFactory;
        this.onSurveyActivatedCallback = onSurveyActivatedCallback;
        this.storage = storage;
        this.governor = governor;
        this.started = false;
        this.loggedFirstStart = false;
        // Initialize our list to a valid, empty collection
        this.setPendingSurveys(null);
        // If the listener was pre-configured with survey for some reason, clear it now
        this.activityListener.clearSurveys();
        // Link ourselves with the listener
        var thisObj = this; // Save current object in a variable to allow access from callback.
        this.activityListener.setCallback({
            run: function (survey) {
                thisObj.onSurveyActivated(survey);
            },
        });
    }
    FloodgateEngine.setTelemetryLogger = function (telemetryLogger) {
        if (!telemetryLogger) {
            throw new Error("telemetryLogger must not be null");
        }
        FloodgateEngine.telemetryLogger = telemetryLogger;
    };
    FloodgateEngine.getTelemetryLogger = function () {
        return FloodgateEngine.telemetryLogger;
    };
    FloodgateEngine.make = function (buildVersion, launcherFactory, onSurveyActivatedCallback, storageProvider, stringProvider, environmentProvider) {
        return new FloodgateEngine(new CampaignManager_1.CampaignManager(new CampaignStateProvider_1.FileBasedCampaignStateProvider(storageProvider), new CampaignDefinitionProvider_1.FileSystemCampaignDefinitionProvider(storageProvider), stringProvider, environmentProvider, buildVersion, new Date()), new SurveyActivityListener({ run: function (survey) { } }), launcherFactory, onSurveyActivatedCallback, storageProvider, new Governor_1.Governor(new GovernedChannelStateProvider_1.FileBasedGovernedChannelStateProvider(storageProvider)));
    };
    /**
     * Save all internal stats and floodgateSettings (merging with existing file contents), without stopping the engine.
     */
    FloodgateEngine.prototype.mergeAndSave = function () {
        this.saveSettings();
        this.saveSurveyActivationHistory();
        this.saveSurveyEventActivityHistory();
    };
    /**
     * Start the engine.  Checks feature enable state, causes survey definitions to be read, and tracked activities to be set on the listener.
     */
    FloodgateEngine.prototype.start = function () {
        if (this.started) {
            return;
        }
        // Load up the general floodgateSettings
        this.floodgateSettings = FloodgateSettings_1.FloodgateSettings.fromJson(this.readString(IFloodgateStorageProvider.FileType.FloodgateSettings));
        // Load up the prior survey history and prior event counts
        this.previousSurveyActivationStats =
            SurveyStatCollectionActivation_1.SurveyStatCollectionActivation.fromJson(this.readString(IFloodgateStorageProvider.FileType.SurveyActivationStats));
        this.previousSurveyEventActivityStats =
            SurveyStatCollectionEventActivity_1.SurveyStatCollectionEventActivity.fromJson(this.readString(IFloodgateStorageProvider.FileType.SurveyEventActivityStats));
        // Make sure we've loaded the current survey definitions
        var channels = this.governor.getAvailableChannelData();
        var channelTypes = [];
        channels.forEach(function (channel) {
            if (channel) {
                channelTypes.push(channel.getType());
            }
        });
        this.surveyClient.refreshSurveyDefinitions(channelTypes);
        // Update our survey list, and push that through to the listener
        this.setPendingSurveys(this.surveyClient.getAppSurveys());
        this.updateActivityListenerWithCurrentSurveyDefinitions();
        // Mark us as started
        this.started = true;
        // Log our first start (aka floodgate boot) event
        if (!this.loggedFirstStart) {
            this.loggedFirstStart = true;
            this.getActivityListener().logActivity("FloodgateFirstStart");
        }
    };
    /**
     * Stop the engine.  Causes tracked activities to be cleared and any in-progress counters not otherwise saved to be thrown out.
     */
    FloodgateEngine.prototype.stop = function () {
        if (!this.started) {
            return;
        }
        this.mergeAndSave();
        // Clear our Survey list, and push that through to the listener
        this.setPendingSurveys(null);
        this.updateActivityListenerWithCurrentSurveyDefinitions();
        this.started = false;
    };
    /**
     * Gets the IActivityListener logging interface for callers that want to log directly rather than through telemetry
     */
    FloodgateEngine.prototype.getActivityListener = function () {
        return this.activityListener;
    };
    FloodgateEngine.prototype.saveSettings = function () {
        this.storage.fileLock(IFloodgateStorageProvider.FileType.FloodgateSettings);
        try {
            this.writeString(IFloodgateStorageProvider.FileType.FloodgateSettings, FloodgateSettings_1.FloodgateSettings.toJson(this.floodgateSettings));
        }
        finally {
            this.storage.fileUnlock(IFloodgateStorageProvider.FileType.FloodgateSettings);
        }
    };
    FloodgateEngine.prototype.saveSurveyActivationHistory = function () {
        this.storage.fileLock(IFloodgateStorageProvider.FileType.SurveyActivationStats);
        try {
            var statCollection = SurveyStatCollectionActivation_1.SurveyStatCollectionActivation.fromJson(this.readString(IFloodgateStorageProvider.FileType.SurveyActivationStats));
            // Build the update collection
            var updateCollection = new SurveyStatCollectionActivation_1.SurveyStatCollectionActivation();
            for (var key in this.launchedSurveys) {
                if (this.launchedSurveys.hasOwnProperty(key)) {
                    var stats = new SurveyStatCollectionActivation_1.SurveyActivationStats();
                    var survey = this.launchedSurveys[key];
                    stats.Type = survey.getType();
                    stats.ExpirationTimeUtc = survey.getSurveyInfo().getExpirationTimeUtc();
                    stats.ActivationTimeUtc = new Date();
                    // Make this part of the update list
                    updateCollection.addStats(survey.getSurveyInfo().getId(), stats);
                }
            }
            // Actually merge our updates into the full collection
            statCollection.accumulate(updateCollection);
            this.writeString(IFloodgateStorageProvider.FileType.SurveyActivationStats, SurveyStatCollectionActivation_1.SurveyStatCollectionActivation.toJson(statCollection));
            // Make sure to keep our internal collection consistent with what we just wrote
            this.previousSurveyActivationStats = statCollection;
        }
        finally {
            this.storage.fileUnlock(IFloodgateStorageProvider.FileType.SurveyActivationStats);
        }
    };
    FloodgateEngine.prototype.saveSurveyEventActivityHistory = function () {
        this.storage.fileLock(IFloodgateStorageProvider.FileType.SurveyEventActivityStats);
        try {
            var statCollection = SurveyStatCollectionEventActivity_1.SurveyStatCollectionEventActivity.fromJson(this.readString(IFloodgateStorageProvider.FileType.SurveyEventActivityStats));
            var now = new Date();
            // Fill out our list of updates
            var updateCollection = new SurveyStatCollectionEventActivity_1.SurveyStatCollectionEventActivity();
            var _loop_1 = function (key) {
                if (this_1.candidateSurveys.hasOwnProperty(key)) {
                    var stats = new SurveyStatCollectionEventActivity_1.SurveyEventActivityStats();
                    var survey = this_1.candidateSurveys[key];
                    if (!survey.getSurveyInfo().isActiveForDate(now)) {
                        return "continue";
                    }
                    stats.ExpirationTimeUtc = survey.getSurveyInfo().getExpirationTimeUtc();
                    // Get the activities which are aggregated, if there aren't any continue
                    var allActivities = survey.getSurveyInfo().getActivationEvent().getTrackingSet();
                    var aggregateActivities_1 = [];
                    allActivities.getList().forEach(function (data) {
                        if (data && data.getIsAggregate()) {
                            aggregateActivities_1.push(data.getActivity());
                        }
                    });
                    if (aggregateActivities_1.length === 0) {
                        return "continue";
                    }
                    stats.Counts = new Array(aggregateActivities_1.length);
                    // Save off the counts we've added for this session
                    for (var i = 0; i < aggregateActivities_1.length; i++) {
                        stats.Counts[i] = this_1.activityListener.moveSessionCountIntoBaseCount(aggregateActivities_1[i]);
                    }
                    // Make this part of the update list
                    updateCollection.addStats(survey.getSurveyInfo().getId(), stats);
                }
            };
            var this_1 = this;
            for (var key in this.candidateSurveys) {
                _loop_1(key);
            }
            // Actually merge our updates into the full collection
            statCollection.accumulate(updateCollection);
            this.writeString(IFloodgateStorageProvider.FileType.SurveyEventActivityStats, SurveyStatCollectionEventActivity_1.SurveyStatCollectionEventActivity.toJson(statCollection));
            // Make sure to keep our internal collection consistent with what we just wrote
            this.previousSurveyEventActivityStats = statCollection;
        }
        finally {
            this.storage.fileUnlock(IFloodgateStorageProvider.FileType.SurveyEventActivityStats);
        }
    };
    FloodgateEngine.prototype.setPendingSurveys = function (pendingSurveys) {
        if (!pendingSurveys) {
            // Turn null into a valid empty collection
            this.candidateSurveys = {};
        }
        else {
            this.candidateSurveys = pendingSurveys;
        }
    };
    FloodgateEngine.prototype.updateActivityListenerWithCurrentSurveyDefinitions = function () {
        // Get a vector of Surveys from our id-based map
        var surveyList = new Array();
        for (var key in this.candidateSurveys) {
            if (this.candidateSurveys.hasOwnProperty(key)) {
                var survey = this.candidateSurveys[key];
                // Skip over any candidate surveys that have been previously completed
                if (this.previousSurveyActivationStats.getBySurveyId(survey.getSurveyInfo().getId())) {
                    // TODO (gachoi) log that Skipping previously activated survey
                    continue;
                }
                if (!survey.getSurveyInfo().isActiveForDate(new Date())) {
                    continue;
                }
                FloodgateEngine.telemetryLogger.log_UserSelected(survey.getSurveyInfo().getBackEndId(), survey.getSurveyInfo().getId(), survey.getType());
                surveyList.push(survey);
            }
        }
        this.activityListener.setSurveys(surveyList, this.previousSurveyEventActivityStats);
    };
    FloodgateEngine.prototype.onSurveyActivated = function (survey) {
        FloodgateEngine.telemetryLogger.log_TriggerMet(survey.getSurveyInfo().getBackEndId(), survey.getSurveyInfo().getId(), survey.getType());
        var launchSurvey = false;
        var governedChannelType = survey.getSurveyInfo().getGovernedChannelType();
        // Figure out if the activated survey is still relevant
        if (!this.candidateSurveys[survey.getSurveyInfo().getId()]) {
            // Survey is no longer relevant but was activated. Suppress it.
            // TODO(gachoi) log INFO Survey was activated but is no longer registered
        }
        else if (!survey.getSurveyInfo().isActiveForDate(new Date())) {
            // Survey is no longer active (e.g. it was when we registered it but it has now expired)
        }
        else if (!this.governor.isChannelOpen(governedChannelType)) {
            // Channel has closed, suppress the survey
        }
        else {
            if (Object.keys(this.launchedSurveys).length === 0) {
                // for now we only support launching one survey per session
                // Track this survey activation for the launch history tracker
                this.launchedSurveys[survey.getSurveyInfo().getId()] = survey;
                launchSurvey = true;
            }
        }
        // At this point, regardless of whether or not the survey is still relevant, we should flush out the stats, and shut off further survey launches
        this.mergeAndSave();
        this.activityListener.clearSurveys();
        // Actually launch the survey
        if (launchSurvey) {
            this.governor.startChannelCooldown(governedChannelType);
            this.surveyClient.onSurveyActivated(survey.getSurveyInfo());
            this.launchLauncher(survey);
        }
    };
    FloodgateEngine.prototype.readString = function (fileType) {
        return this.storage.read(fileType);
    };
    FloodgateEngine.prototype.writeString = function (fileType, str) {
        this.storage.write(fileType, str);
    };
    FloodgateEngine.prototype.launchLauncher = function (survey) {
        var launcher = this.launcherFactory.makeSurveyLauncher(survey);
        if (launcher) {
            this.launchedLaunchers.push(launcher);
            this.onSurveyActivatedCallback.onSurveyActivated(launcher);
        }
    };
    // Initialize telemetry logger with no-op logger
    FloodgateEngine.telemetryLogger = new DefaultFloodgateTelemetryLogger();
    return FloodgateEngine;
}());
exports.FloodgateEngine = FloodgateEngine;

},{"./Api/IFloodgateStorageProvider":7,"./Campaign/CampaignDefinitionProvider":12,"./Campaign/CampaignManager":13,"./Campaign/CampaignStateProvider":14,"./FloodgateSettings":17,"./GovernedChannelStateProvider":19,"./Governor":20,"./SurveyActivityListener":24,"./SurveyStatCollectionActivation":30,"./SurveyStatCollectionEventActivity":31}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * General floodgate settings
 */
var FloodgateSettings = /** @class */ (function () {
    function FloodgateSettings() {
    }
    /**
     * Convert to Json
     */
    FloodgateSettings.toJson = function (object) {
        return JSON.stringify(object);
    };
    /**
     * Load from Json
     */
    FloodgateSettings.fromJson = function (json) {
        return JSON.parse(json);
    };
    return FloodgateSettings;
}());
exports.FloodgateSettings = FloodgateSettings;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./Utils");
var GovernedChannelType;
(function (GovernedChannelType) {
    GovernedChannelType[GovernedChannelType["Standard"] = 0] = "Standard";
    GovernedChannelType[GovernedChannelType["Urgent"] = 1] = "Urgent";
})(GovernedChannelType = exports.GovernedChannelType || (exports.GovernedChannelType = {}));
(function (GovernedChannelType) {
    function getDefault() { return GovernedChannelType.Standard; }
    GovernedChannelType.getDefault = getDefault;
})(GovernedChannelType = exports.GovernedChannelType || (exports.GovernedChannelType = {}));
var GovernedChannel = /** @class */ (function () {
    function GovernedChannel(type, name, cooldownSeconds, cooldownStartTime) {
        if (!Utils.isEnumValue(type, GovernedChannelType)) {
            throw new Error("type is not a valid GovernedChannelType");
        }
        if (!name) {
            throw new Error("name must not be null or empty");
        }
        if (cooldownSeconds < 0) {
            throw new Error("cooldownSeconds must not be negative");
        }
        this.type = type;
        this.name = name;
        this.cooldownSeconds = cooldownSeconds;
        this.setCooldownStartTime(cooldownStartTime);
    }
    GovernedChannel.prototype.setCooldownStartTime = function (cooldownStartTime) {
        // Set the start time
        this.cooldownStartTime = cooldownStartTime;
        if (Utils.isNullOrUndefined(this.cooldownStartTime)) {
            // Null cooldownStartTime means cool down has never been initiated, so set the cooldownEndTime to distant past
            this.cooldownEndTime = Utils.getDistantPast();
        }
        else {
            // Calculate the end time, but don't overflow past max.
            this.cooldownEndTime = Utils.addSecondsWithoutOverflow(this.cooldownStartTime, this.cooldownSeconds);
        }
    };
    // @Override
    GovernedChannel.prototype.isOpen = function () {
        return this.isOpenAtDate(new Date());
    };
    // @Override
    GovernedChannel.prototype.isOpenAtDate = function (date) {
        if (!date) {
            return false;
        }
        return (date > this.cooldownEndTime);
    };
    // @Override
    GovernedChannel.prototype.getType = function () {
        return this.type;
    };
    // @Override
    GovernedChannel.prototype.getName = function () {
        return this.name;
    };
    // @Override
    GovernedChannel.prototype.getCooldownSeconds = function () {
        return this.cooldownSeconds;
    };
    // @Override
    GovernedChannel.prototype.getCooldownStartTime = function () {
        return this.cooldownStartTime;
    };
    // @Override
    GovernedChannel.prototype.getCooldownEndTime = function () {
        return this.cooldownEndTime;
    };
    return GovernedChannel;
}());
exports.GovernedChannel = GovernedChannel;

},{"./Utils":36}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IFloodgateStorageProvider = require("./Api/IFloodgateStorageProvider");
var GovernedChannel_1 = require("./GovernedChannel");
var Utils = require("./Utils");
var GovernedChannelState = /** @class */ (function () {
    function GovernedChannelState(type, cooldownStartTime) {
        this.ChannelType = type;
        this.CooldownStartTimeUtc = cooldownStartTime;
        if (!this.validate()) {
            throw new Error("Constructor arguments are not valid");
        }
    }
    /**
     * Method to deserialize a JSON object to class object
     * @param input: JSON object
     * Returns class object
     */
    GovernedChannelState.deserialize = function (input) {
        var result;
        if (!input) {
            return null;
        }
        // Validation is handled by GovernedChannelState's constructor
        try {
            result = new GovernedChannelState(input.ChannelType, input.CooldownStartTimeUtc);
        }
        catch (e) {
            // TODO(gachoi) Log parsing failed
            return null;
        }
        return result;
    };
    GovernedChannelState.prototype.validate = function () {
        if (!Utils.isEnumValue(this.ChannelType, GovernedChannel_1.GovernedChannelType)) {
            return false;
        }
        // make it a date object if it's a valid UTC date time value
        if (Utils.isUtcDatetimeString(this.CooldownStartTimeUtc)) {
            this.CooldownStartTimeUtc = Utils.stringToDate(this.CooldownStartTimeUtc);
            // Allow null and bad cooldownStartTime
        }
        else if (Utils.isNullOrUndefined(this.CooldownStartTimeUtc) || !Utils.isDate(this.CooldownStartTimeUtc)) {
            this.CooldownStartTimeUtc = Utils.getDistantPast();
        }
        return true;
    };
    GovernedChannelState.prototype.getType = function () {
        return this.ChannelType;
    };
    GovernedChannelState.prototype.getCooldownStartTime = function () {
        return this.CooldownStartTimeUtc;
    };
    return GovernedChannelState;
}());
exports.GovernedChannelState = GovernedChannelState;
/**
 * Class representing what is stored in the file.
 */
var FileData = /** @class */ (function () {
    function FileData() {
    }
    return FileData;
}());
var FileBasedGovernedChannelStateProvider = /** @class */ (function () {
    function FileBasedGovernedChannelStateProvider(storage) {
        if (!storage) {
            throw new Error("storage must not be null");
        }
        this.storage = storage;
    }
    // @Override
    FileBasedGovernedChannelStateProvider.prototype.load = function () {
        // Load channel state from file using _storageProvider (get back string)
        var readString = this.storage.read(IFloodgateStorageProvider.FileType.GovernedChannelStates);
        if (!readString) {
            return [];
        }
        var fileData;
        try {
            fileData = JSON.parse(readString);
        }
        catch (e) {
            // TODO(gachoi) Log parsing failed
            return [];
        }
        var result = [];
        if (fileData && fileData.ChannelStates) {
            fileData.ChannelStates.forEach(function (state) {
                var newState = GovernedChannelState.deserialize(state);
                if (newState) {
                    result.push(newState);
                }
            });
        }
        return result;
    };
    // @Override
    FileBasedGovernedChannelStateProvider.prototype.save = function (states) {
        if (!states) {
            return;
        }
        var fileData = new FileData();
        fileData.ChannelStates = states;
        var writeString = JSON.stringify(fileData);
        this.storage.write(IFloodgateStorageProvider.FileType.GovernedChannelStates, writeString);
    };
    return FileBasedGovernedChannelStateProvider;
}());
exports.FileBasedGovernedChannelStateProvider = FileBasedGovernedChannelStateProvider;

},{"./Api/IFloodgateStorageProvider":7,"./GovernedChannel":18,"./Utils":36}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GovernedChannel_1 = require("./GovernedChannel");
var GovernedChannelStateProvider_1 = require("./GovernedChannelStateProvider");
var Utils = require("./Utils");
var DefaultChannelData = /** @class */ (function () {
    function DefaultChannelData(name, cooldownSeconds) {
        this.name = name;
        this.cooldownSeconds = cooldownSeconds;
    }
    return DefaultChannelData;
}());
var Governor = /** @class */ (function () {
    function Governor(channelStateProvider) {
        if (!channelStateProvider) {
            throw new Error("channelStateProvider must not be null");
        }
        this.channelStateProvider = channelStateProvider;
        this.loadChannels();
    }
    // @Override
    Governor.prototype.getAvailableChannelData = function () {
        var channelData = [];
        for (var key in this.channels) {
            if (this.channels.hasOwnProperty(key)) {
                var channel = this.channels[key];
                if (channel.isOpen()) {
                    channelData.push(channel);
                }
            }
        }
        return channelData;
    };
    // @Override
    Governor.prototype.isChannelOpen = function (type) {
        if (Utils.isNullOrUndefined(type)) {
            throw new Error("type must not be null");
        }
        return this.channels[type].isOpen();
    };
    // @Override
    Governor.prototype.startChannelCooldown = function (type, date) {
        if (Utils.isNullOrUndefined(type)) {
            throw new Error("type must not be null");
        }
        date = date ? date : new Date();
        // Start the cool down
        this.channels[type].setCooldownStartTime(date);
        // Save the new channel state for future sessions
        this.saveChannelStatesToProvider();
    };
    Governor.prototype.loadChannels = function () {
        // Load up state from previous sessions
        this.loadChannelStatesFromProvider();
        // For any missing channels, init them from scratch
        // There's no straightforward way to iterate enums, we need to iterate through the enum array
        //    filtering out just the numeric enum values (excluding enum names).
        for (var item in GovernedChannel_1.GovernedChannelType) {
            if (GovernedChannel_1.GovernedChannelType.hasOwnProperty(item)) {
                var key = Number(item);
                // skip if key is not numeric enum value, or if already exists
                if (isNaN(key) || this.channels[key]) {
                    continue;
                }
                var defaultData = Governor.defaultChannelData[key];
                var newChannel = new GovernedChannel_1.GovernedChannel(key, defaultData.name, defaultData.cooldownSeconds, null);
                this.channels[key] = newChannel;
            }
        }
    };
    Governor.prototype.loadChannelStatesFromProvider = function () {
        this.channels = [];
        var channelStates = this.channelStateProvider.load();
        for (var key in channelStates) {
            if (channelStates.hasOwnProperty(key)) {
                var channelState = channelStates[key];
                var type = channelState.getType();
                var defaultData = Governor.defaultChannelData[type];
                var newChannel = new GovernedChannel_1.GovernedChannel(type, defaultData.name, defaultData.cooldownSeconds, channelState.getCooldownStartTime());
                this.channels[newChannel.getType()] = newChannel;
            }
        }
    };
    Governor.prototype.saveChannelStatesToProvider = function () {
        // Build up the list of channel states
        var channelStates = [];
        for (var key in this.channels) {
            if (this.channels.hasOwnProperty(key)) {
                var channel = this.channels[key];
                var channelState = new GovernedChannelStateProvider_1.GovernedChannelState(channel.getType(), channel.getCooldownStartTime());
                channelStates.push(channelState);
            }
        }
        this.channelStateProvider.save(channelStates);
    };
    Governor.minute = 60;
    Governor.hour = 60 * Governor.minute;
    Governor.day = 24 * Governor.hour;
    // Array of default values for each channel type. Indexed by the GovernedChannelType enum name.
    Governor.defaultChannelData = [
        new DefaultChannelData(GovernedChannel_1.GovernedChannelType[GovernedChannel_1.GovernedChannelType.Standard], 14 * Governor.day),
        new DefaultChannelData(GovernedChannel_1.GovernedChannelType[GovernedChannel_1.GovernedChannelType.Urgent], 4 * Governor.hour),
    ];
    return Governor;
}());
exports.Governor = Governor;

},{"./GovernedChannel":18,"./GovernedChannelStateProvider":19,"./Utils":36}],21:[function(require,module,exports){
"use strict";
var ISurveyEvent;
(function (ISurveyEvent) {
    var Type;
    (function (Type) {
        // A string to listen to, with a trigger threshold, and potentially cross-session aggregation
        Type[Type["CountedActivity"] = "CountedActivity"] = "CountedActivity";
        // An ordered list of CountedActivities, to be activated in sequence
        Type[Type["CountedActivitySequence"] = "CountedActivitySequence"] = "CountedActivitySequence";
    })(Type = ISurveyEvent.Type || (ISurveyEvent.Type = {}));
})(ISurveyEvent || (ISurveyEvent = {}));
module.exports = ISurveyEvent;

},{}],22:[function(require,module,exports){
"use strict";
var ISurveyInfo;
(function (ISurveyInfo) {
    var LaunchType;
    (function (LaunchType) {
        // No launch type specified, defer to the launcher factory code
        LaunchType[LaunchType["Default"] = "Default"] = "Default";
        // Prefer a notification-based launcher (like the windows toast launcher when present)
        LaunchType[LaunchType["Notification"] = "Notification"] = "Notification";
        // Prefer a modal-dialog based launcher
        LaunchType[LaunchType["Modal"] = "Modal"] = "Modal";
    })(LaunchType = ISurveyInfo.LaunchType || (ISurveyInfo.LaunchType = {}));
    var AdditionalDataType;
    (function (AdditionalDataType) {
        // Request email address
        AdditionalDataType[AdditionalDataType["EmailAddress"] = 0] = "EmailAddress";
    })(AdditionalDataType = ISurveyInfo.AdditionalDataType || (ISurveyInfo.AdditionalDataType = {}));
    ISurveyInfo.DOM_TYPE_TAGNAME = "Type";
    ISurveyInfo.DOM_TYPE_VALUE = "Survey";
    ISurveyInfo.DOM_ID_TAGNAME = "SurveyID";
    ISurveyInfo.JSON_SURVEY_KEYNAME = "survey";
    ISurveyInfo.JSON_ID_KEYNAME = "surveyId";
})(ISurveyInfo || (ISurveyInfo = {}));
module.exports = ISurveyInfo;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexedTracker = /** @class */ (function () {
    function IndexedTracker() {
    }
    return IndexedTracker;
}());
exports.IndexedTracker = IndexedTracker;

},{}],24:[function(require,module,exports){
"use strict";
var ActivityTracker = require("./ActivityTracker");
var IndexedTracker_1 = require("./IndexedTracker");
var SurveyStatCollectionEventActivity_1 = require("./SurveyStatCollectionEventActivity");
/**
 * This class tracks log calls against named activity strings (matched on strict case-sensitive equality)
 * and calls the provided callback when all activity thresholds for a given survey have been crossed
 *
 * // todo (gachoi): Refactor callback with Promise
 */
var SurveyActivityListener = /** @class */ (function () {
    function SurveyActivityListener(callback) {
        if (!callback) {
            throw new Error("callback must not be null");
        }
        this.trackedActivityMap = {};
        this.callback = callback;
    }
    SurveyActivityListener.prototype.logActivity = function (activityName, increment) {
        if (increment === void 0) { increment = 1; }
        this.logActivity_private(activityName, SurveyActivityListener.LogActionType.Increment, increment, null);
    };
    SurveyActivityListener.prototype.logActivityStartTime = function (activityName, startTime) {
        this.logActivity_private(activityName, SurveyActivityListener.LogActionType.StartTime, 0, startTime);
    };
    SurveyActivityListener.prototype.logActivityStopTime = function (activityName, stopTime) {
        this.logActivity_private(activityName, SurveyActivityListener.LogActionType.StopTime, 0, stopTime);
    };
    SurveyActivityListener.prototype.setSurveys = function (surveys, baseline) {
        if (baseline === void 0) { baseline = new SurveyStatCollectionEventActivity_1.SurveyStatCollectionEventActivity(); }
        if (!surveys || surveys.length === 0 || !baseline) {
            return;
        }
        // Populate a new map based on the passed in surveys, but propagating and tracking activity counts
        // we may have seen against those events
        // NOTE: We will lose activity counts for survey events that are no longer relevant.
        var newMap = new Object();
        for (var _i = 0, surveys_1 = surveys; _i < surveys_1.length; _i++) {
            var survey = surveys_1[_i];
            var trackingSet = survey.getSurveyInfo().getActivationEvent().getTrackingSet();
            // Don't add the survey if any of its events overlap with an already registered survey
            var hasOverlap = false;
            for (var _a = 0, _b = trackingSet.getList(); _a < _b.length; _a++) {
                var trackingData = _b[_a];
                if (newMap.hasOwnProperty(trackingData.getActivity())) {
                    hasOverlap = true;
                    break;
                }
            }
            if (hasOverlap) {
                continue;
            }
            // At this point, the survey's activities are safe to add.
            // Set up the structures we need to transfer baseline counts (from previous sessions) or current counts (from previous trackers)
            // Both vectors must be sorted in the same order as the trackingSet.List items
            var baselineStats = baseline.getBySurveyId(survey.getSurveyInfo().getId());
            var baselineCounts = [trackingSet.getList().length];
            var currentIndexedTrackers = new Array(trackingSet.getList().length);
            var currentBaselineIndex = 0;
            var currentIndex = 0;
            for (var _c = 0, _d = trackingSet.getList(); _c < _d.length; _c++) {
                var trackingData = _d[_c];
                // Baseline stats are only stored for events with "IsAggregate = true"
                baselineCounts[currentIndex] = 0;
                if (trackingData.getIsAggregate() && baselineStats && currentBaselineIndex < baselineStats.Counts.length) {
                    baselineCounts[currentIndex] = baselineStats.Counts[currentBaselineIndex++];
                }
                // Session stats may be available in the previous trackedActivityMap
                // Transfer the old "current session" count to the new tracker
                // Is set to null if not available
                currentIndexedTrackers[currentIndex] = this.trackedActivityMap[trackingData.getActivity()];
                currentIndex++;
            }
            // Make a new tracker and init the counts appropriately.
            var newTracker = new ActivityTracker(trackingSet);
            // If in a future change we start keeping trackers registered past activation, this will change
            newTracker.initCounts(baselineCounts, currentIndexedTrackers, false /*wasActivatedThisSession*/);
            // Setup the indexed trackers
            for (var _e = 0, _f = newTracker.generateActivityIndexList(); _e < _f.length; _e++) {
                var activityIndex = _f[_e];
                var indexedTracker = new IndexedTracker_1.IndexedTracker();
                indexedTracker.index = activityIndex.index;
                indexedTracker.survey = survey;
                indexedTracker.tracker = newTracker;
                // Register the new tracker in our new map
                newMap[activityIndex.activity] = indexedTracker;
            }
        }
        // Set the new map in place of the old
        this.copyObject(this.trackedActivityMap, newMap);
    };
    SurveyActivityListener.prototype.clearSurveys = function () {
        var _this = this;
        Object.getOwnPropertyNames(this.trackedActivityMap).forEach(function (key) {
            delete _this.trackedActivityMap[key];
        });
    };
    SurveyActivityListener.prototype.getCount = function (activity) {
        var indexedTracker;
        indexedTracker = this.trackedActivityMap[activity];
        if (!indexedTracker) {
            return 0;
        }
        return indexedTracker.tracker.getCount(indexedTracker.index);
    };
    SurveyActivityListener.prototype.getSessionCount = function (activity) {
        var indexedTracker;
        indexedTracker = this.trackedActivityMap[activity];
        if (!indexedTracker) {
            return 0;
        }
        return indexedTracker.tracker.getSessionCount(indexedTracker.index);
    };
    /**
     * An atomic get-and-set method.  Returns the current SessionCount, resetting it to zero and adding it into the established baseline
     */
    SurveyActivityListener.prototype.moveSessionCountIntoBaseCount = function (activity) {
        var indexedTracker;
        indexedTracker = this.trackedActivityMap[activity];
        if (!indexedTracker) {
            return 0;
        }
        return indexedTracker.tracker.moveSessionCountIntoBaseCount(indexedTracker.index);
    };
    SurveyActivityListener.prototype.getSurvey = function (activity) {
        var indexedTracker;
        indexedTracker = this.trackedActivityMap[activity];
        if (!indexedTracker) {
            return null;
        }
        return indexedTracker.survey;
    };
    SurveyActivityListener.prototype.setCallback = function (callback) {
        this.callback = callback;
    };
    SurveyActivityListener.prototype.logActivity_private = function (activityName, logType, increment, timestamp) {
        var indexedTracker;
        var result;
        indexedTracker = this.trackedActivityMap[activityName];
        if (!indexedTracker) {
            return;
        }
        switch (logType) {
            case SurveyActivityListener.LogActionType.StartTime: {
                indexedTracker.tracker.startTime(indexedTracker.index, timestamp);
                return;
            }
            case SurveyActivityListener.LogActionType.StopTime: {
                increment = indexedTracker.tracker.stopTime(indexedTracker.index, timestamp);
                // fall through to increment the activity as well.
            }
            case SurveyActivityListener.LogActionType.Increment: {
                break;
            }
            default: {
                return;
            }
        }
        result = indexedTracker.tracker.incrementActivity(indexedTracker.index, increment);
        if (result === ActivityTracker.IncrementResult.AllActivitiesActivated) {
            this.executeCallback(indexedTracker.survey);
        }
    };
    SurveyActivityListener.prototype.executeCallback = function (survey) {
        this.callback.run(survey);
    };
    SurveyActivityListener.prototype.copyObject = function (target, source) {
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    };
    return SurveyActivityListener;
}());
(function (SurveyActivityListener) {
    var LogActionType;
    (function (LogActionType) {
        LogActionType[LogActionType["Increment"] = 0] = "Increment";
        LogActionType[LogActionType["StartTime"] = 1] = "StartTime";
        LogActionType[LogActionType["StopTime"] = 2] = "StopTime";
    })(LogActionType = SurveyActivityListener.LogActionType || (SurveyActivityListener.LogActionType = {}));
})(SurveyActivityListener || (SurveyActivityListener = {}));
module.exports = SurveyActivityListener;

},{"./ActivityTracker":2,"./IndexedTracker":23,"./SurveyStatCollectionEventActivity":31}],25:[function(require,module,exports){
"use strict";
var ISurveyComponent = require("./../Api/ISurveyComponent");
var CommentComponent = /** @class */ (function () {
    function CommentComponent(data) {
        if (!data) {
            throw new Error("data must not be null");
        }
        if (!data.question) {
            throw new Error("data.question must not be null or empty");
        }
        this.data = data;
        this.userComment = "";
    }
    CommentComponent.make = function (data) {
        try {
            return new CommentComponent(data);
        }
        catch (e) {
            return null;
        }
    };
    // @Override
    CommentComponent.prototype.getType = function () {
        return ISurveyComponent.Type.Comment;
    };
    // @Override
    CommentComponent.prototype.getQuestion = function () {
        return this.data.question;
    };
    // @Override
    CommentComponent.prototype.setSubmittedText = function (userComment) {
        this.userComment = userComment;
    };
    // @Override
    CommentComponent.prototype.getSubmittedText = function () {
        return this.userComment;
    };
    // @Override
    CommentComponent.prototype.getDomElements = function (doc) {
        if (!doc) {
            throw new Error("Document must not be null");
        }
        var element = doc.createElement(ISurveyComponent.DOM_COMMENT_TAGNAME);
        element.appendChild(doc.createTextNode(this.getSubmittedText()));
        return [element];
    };
    // @Override
    CommentComponent.prototype.getJsonElements = function () {
        var result = {};
        result[ISurveyComponent.JSON_COMMENT_KEYNAME] = this.getSubmittedText();
        return result;
    };
    return CommentComponent;
}());
(function (CommentComponent) {
    var CommentComponentData = /** @class */ (function () {
        function CommentComponentData() {
        }
        return CommentComponentData;
    }());
    CommentComponent.CommentComponentData = CommentComponentData;
})(CommentComponent || (CommentComponent = {}));
module.exports = CommentComponent;

},{"./../Api/ISurveyComponent":11}],26:[function(require,module,exports){
"use strict";
var IPromptComponent = require("./../Api/IPromptComponent");
var ISurveyComponent = require("./../Api/ISurveyComponent");
var PromptComponent = /** @class */ (function () {
    function PromptComponent(data) {
        if (!data) {
            throw new Error("data must not be null");
        }
        if (!data.question) {
            throw new Error("data.question must not be null or empty");
        }
        if (!data.title) {
            throw new Error("data.title must not be null or empty");
        }
        if (!data.yesButtonLabel) {
            throw new Error("data.yesButtonLabel must not be null or empty");
        }
        if (!data.noButtonLabel) {
            throw new Error("data.noButtonLabel must not be null or empty");
        }
        this.data = data;
        this.selectedButton = IPromptComponent.PromptButton.Unselected;
    }
    PromptComponent.make = function (data) {
        try {
            return new PromptComponent(data);
        }
        catch (e) {
            return null;
        }
    };
    // @Override
    PromptComponent.prototype.getType = function () {
        return ISurveyComponent.Type.Prompt;
    };
    // @Override
    PromptComponent.prototype.getTitle = function () {
        return this.data.title;
    };
    // @Override
    PromptComponent.prototype.getQuestion = function () {
        return this.data.question;
    };
    // @Override
    PromptComponent.prototype.getYesButtonText = function () {
        return this.data.yesButtonLabel;
    };
    // @Override
    PromptComponent.prototype.getNoButtonText = function () {
        return this.data.noButtonLabel;
    };
    // @Override
    PromptComponent.prototype.setButtonSelected = function (selected) {
        if (selected) {
            this.selectedButton = selected;
        }
    };
    // @Override
    PromptComponent.prototype.getButtonSelected = function () {
        return this.selectedButton;
    };
    // @Override
    PromptComponent.prototype.getDomElements = function (doc) {
        if (!doc) {
            throw new Error("Document must not be null");
        }
        var element = doc.createElement(ISurveyComponent.DOM_PROMPT_TAGNAME);
        element.appendChild(doc.createTextNode(this.promptButtonToString(this.getButtonSelected())));
        return [element];
    };
    // @Override
    PromptComponent.prototype.getJsonElements = function () {
        var result = {};
        result[ISurveyComponent.JSON_PROMPT_KEYNAME] = this.promptButtonToString(this.getButtonSelected());
        return result;
    };
    PromptComponent.prototype.promptButtonToString = function (value) {
        switch (value) {
            case IPromptComponent.PromptButton.Unselected:
                return "Unselected";
            case IPromptComponent.PromptButton.Yes:
                return "Yes";
            case IPromptComponent.PromptButton.No:
                return "No";
            default:
                return "Unknown";
        }
    };
    return PromptComponent;
}());
(function (PromptComponent) {
    var PromptComponentData = /** @class */ (function () {
        function PromptComponentData() {
        }
        return PromptComponentData;
    }());
    PromptComponent.PromptComponentData = PromptComponentData;
})(PromptComponent || (PromptComponent = {}));
module.exports = PromptComponent;

},{"./../Api/IPromptComponent":9,"./../Api/ISurveyComponent":11}],27:[function(require,module,exports){
"use strict";
var ISurveyComponent = require("./../Api/ISurveyComponent");
var RatingComponent = /** @class */ (function () {
    function RatingComponent(data) {
        if (!data) {
            throw new Error("data must not be null");
        }
        if (!data.question) {
            throw new Error("data.question must not be null or empty");
        }
        if (!data.ratingValuesAscending || data.ratingValuesAscending.length < 2) {
            throw new Error("data.ratingValuesAscending must not be null or have less than two choices");
        }
        data.ratingValuesAscending.forEach(function (rating) {
            if (!rating) {
                throw new Error("rating values must not contain null or empty");
            }
        });
        this.data = data;
        this.selectedIndex = -1;
    }
    RatingComponent.make = function (data) {
        try {
            return new RatingComponent(data);
        }
        catch (e) {
            return null;
        }
    };
    RatingComponent.prototype.getType = function () {
        return ISurveyComponent.Type.Rating;
    };
    RatingComponent.prototype.getQuestion = function () {
        return this.data.question;
    };
    RatingComponent.prototype.getRatingValuesAscending = function () {
        return this.data.ratingValuesAscending;
    };
    RatingComponent.prototype.getSelectedRating = function () {
        if (!this.isRatingIndexValid(this.selectedIndex)) {
            return "";
        }
        return this.data.ratingValuesAscending[this.selectedIndex];
    };
    RatingComponent.prototype.setSelectedRatingIndex = function (selected) {
        if (this.isRatingIndexValid(selected)) {
            this.selectedIndex = selected;
        }
        else {
            this.selectedIndex = -1;
        }
    };
    RatingComponent.prototype.getSelectedRatingIndex = function () {
        return this.selectedIndex;
    };
    RatingComponent.prototype.getDomElements = function (doc) {
        if (!doc) {
            throw new Error("Document must not be null");
        }
        var element = doc.createElement(ISurveyComponent.DOM_RATING_TAGNAME);
        if (!this.isRatingIndexValid(this.getSelectedRatingIndex())) {
            element.appendChild(doc.createTextNode("Not rated"));
        }
        else {
            // Enforce six digits after the decimal
            element.appendChild(doc.createTextNode(this.getNormalizedRatingScore().toFixed(6)));
        }
        return [element];
    };
    // @Override
    RatingComponent.prototype.getJsonElements = function () {
        var result = {};
        if (!this.isRatingIndexValid(this.getSelectedRatingIndex())) {
            result[ISurveyComponent.JSON_RATING_KEYNAME] = "Not rated";
        }
        else {
            result[ISurveyComponent.JSON_RATING_KEYNAME] = this.getNormalizedRatingScore();
        }
        return result;
    };
    RatingComponent.prototype.isRatingIndexValid = function (index) {
        return (index >= 0 && index < this.data.ratingValuesAscending.length);
    };
    RatingComponent.prototype.getNormalizedRatingScore = function () {
        if (!this.isRatingIndexValid(this.getSelectedRatingIndex())) {
            return 0;
        }
        if (this.data.isZeroBased) {
            return (this.selectedIndex) / (this.data.ratingValuesAscending.length - 1);
        }
        else {
            return (this.selectedIndex + 1.0) / this.data.ratingValuesAscending.length;
        }
    };
    return RatingComponent;
}());
(function (RatingComponent) {
    var RatingComponentData = /** @class */ (function () {
        function RatingComponentData() {
        }
        return RatingComponentData;
    }());
    RatingComponent.RatingComponentData = RatingComponentData;
})(RatingComponent || (RatingComponent = {}));
module.exports = RatingComponent;

},{"./../Api/ISurveyComponent":11}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTrackingData_1 = require("./ActivityTrackingData");
var ActivityTrackingSet_1 = require("./ActivityTrackingSet");
var ISurveyEvent = require("./ISurveyEvent");
var CountedActivityEvent = /** @class */ (function () {
    function CountedActivityEvent(data) {
        if (!data) {
            throw new Error("data must not be null");
        }
        if (data.count <= 0) {
            throw new Error("count must be greater than 0");
        }
        if (!data.activity || data.activity.length === 0) {
            throw new Error("activity must not be null or an empty string");
        }
        this.data = data;
    }
    CountedActivityEvent.make = function (data) {
        try {
            return new CountedActivityEvent(data);
        }
        catch (e) {
            return null;
        }
    };
    CountedActivityEvent.prototype.getActivity = function () {
        return this.data.activity;
    };
    CountedActivityEvent.prototype.getCount = function () {
        return this.data.count;
    };
    CountedActivityEvent.prototype.isAggregate = function () {
        return this.data.isAggregate;
    };
    CountedActivityEvent.prototype.getType = function () {
        return ISurveyEvent.Type.CountedActivity;
    };
    CountedActivityEvent.prototype.getTrackingSet = function () {
        var trackingDataList = new Array();
        trackingDataList.push(new ActivityTrackingData_1.ActivityTrackingData(this.data.activity, this.data.count, this.data.isAggregate));
        return new ActivityTrackingSet_1.ActivityTrackingSet(false, trackingDataList);
    };
    return CountedActivityEvent;
}());
exports.CountedActivityEvent = CountedActivityEvent;
/**
 * Data class for serialization and deserialization. Do not add logic in here.
 */
var CountedActivityEventData = /** @class */ (function () {
    function CountedActivityEventData() {
    }
    return CountedActivityEventData;
}());
exports.CountedActivityEventData = CountedActivityEventData;
var CountedActivitySequenceEvent = /** @class */ (function () {
    function CountedActivitySequenceEvent(data) {
        if (!data) {
            throw new Error("data must not be null");
        }
        if (!data.sequence) {
            throw new Error("data.sequence must not be null");
        }
        if (data.sequence.length === 0) {
            throw new Error("data.sequence size must be greater than 0");
        }
        this.data = [];
        for (var _i = 0, _a = data.sequence; _i < _a.length; _i++) {
            var countedActivityEventData = _a[_i];
            this.data.push(new CountedActivityEvent(countedActivityEventData));
        }
    }
    CountedActivitySequenceEvent.make = function (data) {
        try {
            return new CountedActivitySequenceEvent(data);
        }
        catch (e) {
            return null;
        }
    };
    CountedActivitySequenceEvent.prototype.getSequence = function () {
        return this.data;
    };
    CountedActivitySequenceEvent.prototype.getType = function () {
        return ISurveyEvent.Type.CountedActivitySequence;
    };
    CountedActivitySequenceEvent.prototype.getTrackingSet = function () {
        var trackingDataList = new Array();
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var countedActivityEvent = _a[_i];
            trackingDataList.push(new ActivityTrackingData_1.ActivityTrackingData(countedActivityEvent.getActivity(), countedActivityEvent.getCount(), countedActivityEvent.isAggregate()));
        }
        return new ActivityTrackingSet_1.ActivityTrackingSet(true, trackingDataList);
    };
    return CountedActivitySequenceEvent;
}());
exports.CountedActivitySequenceEvent = CountedActivitySequenceEvent;
/**
 * Data class for serialization and deserialization. Do not add logic in here.
 */
var CountedActivitySequenceEventData = /** @class */ (function () {
    function CountedActivitySequenceEventData() {
    }
    /**
     * No args constructor needed for serialization.
     */
    CountedActivitySequenceEventData.prototype.CountedActivitySequenceEventData = function () {
    };
    return CountedActivitySequenceEventData;
}());
exports.CountedActivitySequenceEventData = CountedActivitySequenceEventData;

},{"./ActivityTrackingData":3,"./ActivityTrackingSet":4,"./ISurveyEvent":21}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generic class for managing a collection of survey stats. Includes read-from/write-to json structures or a file,
 * as well as merge routines for combining collections
 */
var SurveyStatCollection = /** @class */ (function () {
    function SurveyStatCollection() {
        // The following property name matches the JSON root key name for proper serialization/ deserialization
        this.Surveys = {};
        this.Surveys = {};
    }
    /**
     * Add stats. Overwrites if already exists.
     */
    SurveyStatCollection.prototype.addStats = function (surveyId, stats) {
        this.Surveys[surveyId] = stats;
    };
    /**
     * Get a SurveyActivationStats object by surveyId. Returns null if surveyId is not found
     */
    SurveyStatCollection.prototype.getBySurveyId = function (surveyId) {
        return (this.Surveys[surveyId]);
    };
    /**
     * Get all stats available
     */
    SurveyStatCollection.prototype.getStats = function () {
        return this.Surveys;
    };
    return SurveyStatCollection;
}());
exports.SurveyStatCollection = SurveyStatCollection;

},{}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ISurvey = require("./Api/ISurvey");
var SurveyStatCollection_1 = require("./SurveyStatCollection");
var Utils = require("./Utils");
/**
 * StatCollection for activated surveys.  Should be used to track the SurveyIds
 * that have been recently shown to a user
 */
// TODO (gachoi) Check if this applies - VSOBug: 1443010 One bad Stat object fails the entire serialization
var SurveyStatCollectionActivation = /** @class */ (function (_super) {
    __extends(SurveyStatCollectionActivation, _super);
    function SurveyStatCollectionActivation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Load from Json
     */
    SurveyStatCollectionActivation.fromJson = function (json) {
        var statCollection = new SurveyStatCollectionActivation();
        if (!json) {
            // TODO (gachoi) Log null json passed
            return statCollection;
        }
        var readStats;
        try {
            readStats = JSON.parse(json);
        }
        catch (e) {
            // TODO (gachoi) Log parsing failed
            return statCollection;
        }
        if (!statCollection.deserialize(readStats)) {
            return new SurveyStatCollectionActivation();
        }
        return statCollection;
    };
    /**
     * Convert to Json
     */
    SurveyStatCollectionActivation.toJson = function (object) {
        if (!object) {
            // TODO (gachoi) log that null object passed
            object = new SurveyStatCollectionActivation();
        }
        return JSON.stringify(object);
    };
    /**
     * Add another SurveyStatCollectionActivation object
     */
    SurveyStatCollectionActivation.prototype.accumulate = function (other) {
        if (!other) {
            return;
        }
        var stats = other.getStats();
        // SurveyActivationStats accumulation simply overwrites any keys from 'other' into our collection
        for (var key in stats) {
            if (stats.hasOwnProperty(key)) {
                this.addStats(key, stats[key]);
            }
        }
    };
    /**
     * Method to deserialize SurveyStatCollectionActivation
     * @param input: collection of SurveyStatCollectionActivation
     * Returns result of validation check
     */
    SurveyStatCollectionActivation.prototype.deserialize = function (input) {
        var rawStats = input.Surveys;
        var now = new Date();
        for (var key in rawStats) {
            if (rawStats.hasOwnProperty(key)) {
                var newStat = new SurveyActivationStats();
                if (newStat.deserialize(rawStats[key]) && newStat.ExpirationTimeUtc > now) {
                    this.addStats(key, newStat);
                }
            }
        }
        return this.validate();
    };
    /**
     * Validate the Surveys
     * Returns false if validation fails
     */
    SurveyStatCollectionActivation.prototype.validate = function () {
        return Utils.isObject(this.getStats());
    };
    return SurveyStatCollectionActivation;
}(SurveyStatCollection_1.SurveyStatCollection));
exports.SurveyStatCollectionActivation = SurveyStatCollectionActivation;
var SurveyActivationStats = /** @class */ (function () {
    function SurveyActivationStats() {
    }
    /**
     * Method to deserialize a JSON object to class object
     * @param input: JSON object
     * Returns result of validation check
     */
    SurveyActivationStats.prototype.deserialize = function (input) {
        this.ActivationTimeUtc = input.ActivationTimeUtc;
        this.ExpirationTimeUtc = input.ExpirationTimeUtc;
        this.Type = input.Type;
        return this.validate();
    };
    /**
     * Method to call after deserialization to validate generated object.
     * Returns false if not valid.
     */
    SurveyActivationStats.prototype.validate = function () {
        // make it a date object if it's a valid UTC date time value
        if (Utils.isUtcDatetimeString(this.ActivationTimeUtc)) {
            this.ActivationTimeUtc = Utils.stringToDate(this.ActivationTimeUtc);
        }
        else {
            return false;
        }
        // make it a date object if it's a valid UTC date time value
        if (Utils.isUtcDatetimeString(this.ExpirationTimeUtc)) {
            this.ExpirationTimeUtc = Utils.stringToDate(this.ExpirationTimeUtc);
        }
        else {
            return false;
        }
        return Utils.isEnumValue(this.Type, ISurvey.Type);
    };
    return SurveyActivationStats;
}());
exports.SurveyActivationStats = SurveyActivationStats;

},{"./Api/ISurvey":10,"./SurveyStatCollection":29,"./Utils":36}],31:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SurveyStatCollection_1 = require("./SurveyStatCollection");
var Utils = require("./Utils");
/**
 * StatCollection for EventActivity counts.  Should be used to store/merge
 * aggregate values between sessions tracking the same surveys/events
 * E.g. A survey that activates after 3 boots.
 */
// TODO (gachoi) check the following - VSOBug: 1443010 One bad Stat object fails the entire serialization
var SurveyStatCollectionEventActivity = /** @class */ (function (_super) {
    __extends(SurveyStatCollectionEventActivity, _super);
    function SurveyStatCollectionEventActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Load from Json
     */
    SurveyStatCollectionEventActivity.fromJson = function (json) {
        var statCollection = new SurveyStatCollectionEventActivity();
        if (!json) {
            // TODO (gachoi) Log null json passed
            return statCollection;
        }
        var readStats;
        try {
            readStats = JSON.parse(json);
        }
        catch (e) {
            // TODO (gachoi) Log parsing failed
            return statCollection;
        }
        if (!statCollection.deserialize(readStats)) {
            return new SurveyStatCollectionEventActivity();
        }
        return statCollection;
    };
    /**
     * Convert to Json
     */
    SurveyStatCollectionEventActivity.toJson = function (object) {
        if (!object) {
            // TODO (gachoi) log that null object passed
            object = new SurveyStatCollectionEventActivity();
        }
        return JSON.stringify(object);
    };
    /**
     * Add another SurveyStatCollectionEventActivity object
     */
    SurveyStatCollectionEventActivity.prototype.accumulate = function (other) {
        if (!other) {
            return;
        }
        var stats = other.getStats();
        // SurveyEventActivityStats accumulation simply overwrites any keys from 'other' into our collection
        for (var key in stats) {
            if (stats.hasOwnProperty(key)) {
                var ourStats = this.getBySurveyId(key);
                // If it does not already exist
                if (!ourStats) {
                    ourStats = new SurveyEventActivityStats();
                    ourStats.Counts = [];
                    this.addStats(key, ourStats);
                }
                ourStats.ExpirationTimeUtc = stats[key].ExpirationTimeUtc;
                // If for some reason the other counts array is larger, resize ourStats.counts
                if (ourStats.Counts.length < stats[key].Counts.length) {
                    var resizedCounts = ourStats.Counts.slice();
                    ourStats.Counts = resizedCounts;
                }
                for (var i = 0; i < stats[key].Counts.length; i++) {
                    if (!ourStats.Counts[i]) {
                        ourStats.Counts[i] = 0;
                    }
                    ourStats.Counts[i] += stats[key].Counts[i];
                }
            }
        }
    };
    /**
     * Method to deserialize SurveyStatCollectionEventActivity
     * @param input: collection of SurveyStatCollectionEventActivity
     * Returns result of validation check
     */
    SurveyStatCollectionEventActivity.prototype.deserialize = function (input) {
        var rawStats = input.Surveys;
        var now = new Date();
        for (var key in rawStats) {
            if (rawStats.hasOwnProperty(key)) {
                var newStat = new SurveyEventActivityStats();
                if (newStat.deserialize(rawStats[key]) && newStat.ExpirationTimeUtc > now) {
                    this.addStats(key, newStat);
                }
            }
        }
        return this.validate();
    };
    /**
     * Validate the Surveys
     * Returns false if validation fails
     */
    SurveyStatCollectionEventActivity.prototype.validate = function () {
        return Utils.isObject(this.getStats());
    };
    return SurveyStatCollectionEventActivity;
}(SurveyStatCollection_1.SurveyStatCollection));
exports.SurveyStatCollectionEventActivity = SurveyStatCollectionEventActivity;
var SurveyEventActivityStats = /** @class */ (function () {
    function SurveyEventActivityStats() {
    }
    /**
     * Method to deserialize a JSON object to class object
     * @param input: JSON object
     * Returns result of validation check
     */
    SurveyEventActivityStats.prototype.deserialize = function (input) {
        this.ExpirationTimeUtc = input.ExpirationTimeUtc;
        this.Counts = input.Counts;
        return this.validate();
    };
    /**
     * Method to call after deserialization to validate generated object.
     * Returns false if not valid.
     */
    SurveyEventActivityStats.prototype.validate = function () {
        if (!this.Counts) {
            return false;
        }
        for (var i = 0; i < this.Counts.length; i++) {
            var val = this.Counts[i];
            if (!Utils.isNumber(val)) {
                return false;
            }
            if (val < 0) {
                this.Counts[i] = 0;
            }
        }
        // make it a date object if it's a valid UTC date time value
        if (Utils.isUtcDatetimeString(this.ExpirationTimeUtc)) {
            this.ExpirationTimeUtc = Utils.stringToDate(this.ExpirationTimeUtc);
        }
        else {
            return false;
        }
        return true;
    };
    return SurveyEventActivityStats;
}());
exports.SurveyEventActivityStats = SurveyEventActivityStats;

},{"./SurveyStatCollection":29,"./Utils":36}],32:[function(require,module,exports){
"use strict";
var ISurvey = require("../Api/ISurvey");
var ISurveyComponent = require("../Api/ISurveyComponent");
var CommentComponent = require("../SurveyComponents/CommentComponent");
var PromptComponent = require("../SurveyComponents/PromptComponent");
var RatingComponent = require("../SurveyComponents/RatingComponent");
var Utils = require("../Utils");
var SurveyDataSource = require("./SurveyDataSource");
var FpsSurvey = /** @class */ (function () {
    function FpsSurvey(data) {
        if (Utils.isNullOrUndefined(data)) {
            throw new Error("data must not be null");
        }
        this.surveyInfo = new SurveyDataSource(data.baseData);
        this.prompt = new PromptComponent(data.promptData);
        this.question = new CommentComponent(data.commentData);
        this.rating = new RatingComponent(data.ratingData);
    }
    FpsSurvey.make = function (data) {
        try {
            return new FpsSurvey(data);
        }
        catch (e) {
            return null;
        }
    };
    FpsSurvey.makeFps = function (baseData, sp, surveyModel) {
        if (Utils.isNullOrUndefined(baseData) || Utils.isNullOrUndefined(sp) || Utils.isNullOrUndefined(surveyModel)) {
            return null;
        }
        var ratingValuesAscending = [];
        var content = surveyModel.content;
        if (Utils.isNullOrUndefined(content) || Utils.isNullOrUndefined(content.comment)
            || Utils.isNullOrUndefined(content.prompt) || Utils.isNullOrUndefined(content.rating)) {
            return null;
        }
        var data = new FpsSurvey.FpsSurveyData();
        data.baseData = baseData;
        data.promptData = new PromptComponent.PromptComponentData();
        data.ratingData = new RatingComponent.RatingComponentData();
        data.commentData = new CommentComponent.CommentComponentData();
        data.promptData.title = sp.getCustomString(content.prompt.title);
        data.promptData.question = sp.getCustomString(content.prompt.question);
        data.promptData.yesButtonLabel = sp.getCustomString(content.prompt.yesLabel);
        data.promptData.noButtonLabel = sp.getCustomString(content.prompt.noLabel);
        data.ratingData.question = sp.getCustomString(content.rating.question);
        data.ratingData.isZeroBased = content.rating.isZeroBased;
        data.commentData.question = sp.getCustomString(content.comment.question);
        for (var _i = 0, _a = content.rating.ratingValuesAscending; _i < _a.length; _i++) {
            var value = _a[_i];
            var customString = sp.getCustomString(value);
            if (Utils.isNullOrUndefined(customString)) {
                return null;
            }
            ratingValuesAscending.push(customString);
        }
        data.ratingData.ratingValuesAscending = ratingValuesAscending;
        if (Utils.isNullOrUndefined(data.ratingData.question)
            || Utils.isNullOrUndefined(data.commentData.question)
            || Utils.isNullOrUndefined(data.promptData.title)
            || Utils.isNullOrUndefined(data.promptData.question)
            || Utils.isNullOrUndefined(data.promptData.yesButtonLabel)
            || Utils.isNullOrUndefined(data.promptData.noButtonLabel)
            || Utils.isNullOrUndefined(data.ratingData.ratingValuesAscending)) {
            return null;
        }
        return this.make(data);
    };
    // @Override
    FpsSurvey.prototype.getType = function () {
        return ISurvey.Type.Fps;
    };
    // @Override
    FpsSurvey.prototype.getSurveyInfo = function () {
        return this.surveyInfo;
    };
    // @Override
    FpsSurvey.prototype.getCommentComponent = function () {
        return this.question;
    };
    // @Override
    FpsSurvey.prototype.getPromptComponent = function () {
        return this.prompt;
    };
    // @Override
    FpsSurvey.prototype.getRatingComponent = function () {
        return this.rating;
    };
    // @Override
    FpsSurvey.prototype.getComponent = function (componentType) {
        switch (componentType) {
            case ISurveyComponent.Type.Comment:
                return this.getCommentComponent();
            case ISurveyComponent.Type.Prompt:
                return this.getPromptComponent();
            case ISurveyComponent.Type.Rating:
                return this.getRatingComponent();
            default:
                return null;
        }
    };
    // @Override
    FpsSurvey.prototype.getDomElements = function (doc) {
        if (Utils.isNullOrUndefined(doc)) {
            throw new Error("Document must not be null");
        }
        var element = doc.createElement(ISurvey.DOM_FPS_TAGNAME);
        this.getSurveyInfo().getDomElements(doc).forEach(function (child) {
            if (!Utils.isNullOrUndefined(child)) {
                element.appendChild(child);
            }
        });
        this.getCommentComponent().getDomElements(doc).forEach(function (child) {
            if (!Utils.isNullOrUndefined(child)) {
                element.appendChild(child);
            }
        });
        this.getRatingComponent().getDomElements(doc).forEach(function (child) {
            if (!Utils.isNullOrUndefined(child)) {
                element.appendChild(child);
            }
        });
        return [element];
    };
    // @Override
    FpsSurvey.prototype.getJsonElements = function () {
        var result = {};
        result = Utils.overrideValues(this.getSurveyInfo().getJsonElements(), result);
        result = Utils.overrideValues(this.getCommentComponent().getJsonElements(), result);
        result = Utils.overrideValues(this.getRatingComponent().getJsonElements(), result);
        return result;
    };
    return FpsSurvey;
}());
(function (FpsSurvey) {
    /**
     * Data required for a Fps Survey
     */
    var FpsSurveyData = /** @class */ (function () {
        function FpsSurveyData() {
        }
        return FpsSurveyData;
    }());
    FpsSurvey.FpsSurveyData = FpsSurveyData;
})(FpsSurvey || (FpsSurvey = {}));
module.exports = FpsSurvey;

},{"../Api/ISurvey":10,"../Api/ISurveyComponent":11,"../SurveyComponents/CommentComponent":25,"../SurveyComponents/PromptComponent":26,"../SurveyComponents/RatingComponent":27,"../Utils":36,"./SurveyDataSource":35}],33:[function(require,module,exports){
"use strict";
var ISurvey = require("../Api/ISurvey");
var ISurveyComponent = require("../Api/ISurveyComponent");
var CommentComponent = require("../SurveyComponents/CommentComponent");
var PromptComponent = require("../SurveyComponents/PromptComponent");
var RatingComponent = require("../SurveyComponents/RatingComponent");
var Utils = require("../Utils");
var SurveyDataSource = require("./SurveyDataSource");
var NlqsSurvey = /** @class */ (function () {
    function NlqsSurvey(data) {
        if (Utils.isNullOrUndefined(data)) {
            throw new Error("data must not be null");
        }
        this.surveyInfo = new SurveyDataSource(data.baseData);
        this.prompt = new PromptComponent(data.promptData);
        this.question = new CommentComponent(data.commentData);
        this.rating = new RatingComponent(data.ratingData);
    }
    NlqsSurvey.make = function (data) {
        try {
            return new NlqsSurvey(data);
        }
        catch (e) {
            return null;
        }
    };
    NlqsSurvey.makeNlqs = function (baseData, sp, surveyModel) {
        if (Utils.isNullOrUndefined(baseData) || Utils.isNullOrUndefined(sp) || Utils.isNullOrUndefined(surveyModel)) {
            return null;
        }
        var ratingValuesAscending = [];
        var content = surveyModel.content;
        if (Utils.isNullOrUndefined(content) || Utils.isNullOrUndefined(content.comment)
            || Utils.isNullOrUndefined(content.prompt) || Utils.isNullOrUndefined(content.rating)) {
            return null;
        }
        var data = new NlqsSurvey.NlqsSurveyData();
        data.baseData = baseData;
        data.promptData = new PromptComponent.PromptComponentData();
        data.ratingData = new RatingComponent.RatingComponentData();
        data.commentData = new CommentComponent.CommentComponentData();
        data.promptData.title = sp.getCustomString(content.prompt.title);
        data.promptData.question = sp.getCustomString(content.prompt.question);
        data.promptData.yesButtonLabel = sp.getCustomString(content.prompt.yesLabel);
        data.promptData.noButtonLabel = sp.getCustomString(content.prompt.noLabel);
        data.ratingData.question = sp.getCustomString(content.rating.question);
        data.ratingData.isZeroBased = content.rating.isZeroBased;
        data.commentData.question = sp.getCustomString(content.comment.question);
        for (var _i = 0, _a = content.rating.ratingValuesAscending; _i < _a.length; _i++) {
            var value = _a[_i];
            var customString = sp.getCustomString(value);
            if (Utils.isNullOrUndefined(customString)) {
                return null;
            }
            ratingValuesAscending.push(customString);
        }
        data.ratingData.ratingValuesAscending = ratingValuesAscending;
        if (Utils.isNullOrUndefined(data.ratingData.question)
            || Utils.isNullOrUndefined(data.commentData.question)
            || Utils.isNullOrUndefined(data.promptData.title)
            || Utils.isNullOrUndefined(data.promptData.question)
            || Utils.isNullOrUndefined(data.promptData.yesButtonLabel)
            || Utils.isNullOrUndefined(data.promptData.noButtonLabel)
            || Utils.isNullOrUndefined(data.ratingData.ratingValuesAscending)) {
            return null;
        }
        return this.make(data);
    };
    // @Override
    NlqsSurvey.prototype.getType = function () {
        return ISurvey.Type.Nlqs;
    };
    // @Override
    NlqsSurvey.prototype.getSurveyInfo = function () {
        return this.surveyInfo;
    };
    // @Override
    NlqsSurvey.prototype.getCommentComponent = function () {
        return this.question;
    };
    // @Override
    NlqsSurvey.prototype.getPromptComponent = function () {
        return this.prompt;
    };
    // @Override
    NlqsSurvey.prototype.getRatingComponent = function () {
        return this.rating;
    };
    // @Override
    NlqsSurvey.prototype.getComponent = function (componentType) {
        switch (componentType) {
            case ISurveyComponent.Type.Comment:
                return this.getCommentComponent();
            case ISurveyComponent.Type.Prompt:
                return this.getPromptComponent();
            case ISurveyComponent.Type.Rating:
                return this.getRatingComponent();
            default:
                return null;
        }
    };
    // @Override
    NlqsSurvey.prototype.getDomElements = function (doc) {
        if (Utils.isNullOrUndefined(doc)) {
            throw new Error("Document must not be null");
        }
        var element = doc.createElement(ISurvey.DOM_NLQS_TAGNAME);
        this.getSurveyInfo().getDomElements(doc).forEach(function (child) {
            if (!Utils.isNullOrUndefined(child)) {
                element.appendChild(child);
            }
        });
        this.getCommentComponent().getDomElements(doc).forEach(function (child) {
            if (!Utils.isNullOrUndefined(child)) {
                element.appendChild(child);
            }
        });
        this.getRatingComponent().getDomElements(doc).forEach(function (child) {
            if (!Utils.isNullOrUndefined(child)) {
                element.appendChild(child);
            }
        });
        return [element];
    };
    // @Override
    NlqsSurvey.prototype.getJsonElements = function () {
        var result = {};
        result = Utils.overrideValues(this.getSurveyInfo().getJsonElements(), result);
        result = Utils.overrideValues(this.getCommentComponent().getJsonElements(), result);
        result = Utils.overrideValues(this.getRatingComponent().getJsonElements(), result);
        return result;
    };
    return NlqsSurvey;
}());
(function (NlqsSurvey) {
    /**
     * Data required for a Nlqs Survey
     */
    var NlqsSurveyData = /** @class */ (function () {
        function NlqsSurveyData() {
        }
        return NlqsSurveyData;
    }());
    NlqsSurvey.NlqsSurveyData = NlqsSurveyData;
})(NlqsSurvey || (NlqsSurvey = {}));
module.exports = NlqsSurvey;

},{"../Api/ISurvey":10,"../Api/ISurveyComponent":11,"../SurveyComponents/CommentComponent":25,"../SurveyComponents/PromptComponent":26,"../SurveyComponents/RatingComponent":27,"../Utils":36,"./SurveyDataSource":35}],34:[function(require,module,exports){
"use strict";
var IFloodgateStringProvider = require("../Api/IFloodgateStringProvider");
var ISurvey = require("../Api/ISurvey");
var ISurveyComponent = require("../Api/ISurveyComponent");
var CommentComponent = require("../SurveyComponents/CommentComponent");
var PromptComponent = require("../SurveyComponents/PromptComponent");
var RatingComponent = require("../SurveyComponents/RatingComponent");
var Utils = require("../Utils");
var SurveyDataSource = require("./SurveyDataSource");
var NpsSurvey = /** @class */ (function () {
    function NpsSurvey(data) {
        if (!data) {
            throw new Error("data must not be null");
        }
        this.surveyInfo = new SurveyDataSource(data.baseData);
        this.prompt = new PromptComponent(data.promptData);
        this.question = new CommentComponent(data.commentData);
        this.rating = new RatingComponent(data.ratingData);
    }
    NpsSurvey.make = function (data) {
        try {
            return new NpsSurvey(data);
        }
        catch (e) {
            return null;
        }
    };
    NpsSurvey.makeCustom = function (baseData, sp, surveyModel) {
        if (Utils.isNullOrUndefined(baseData) || Utils.isNullOrUndefined(sp) || Utils.isNullOrUndefined(surveyModel)) {
            return null;
        }
        var ratingValuesAscending = [];
        var content = surveyModel.content;
        if (Utils.isNullOrUndefined(content) || Utils.isNullOrUndefined(content.comment)
            || Utils.isNullOrUndefined(content.prompt) || Utils.isNullOrUndefined(content.rating)) {
            return null;
        }
        var data = new NpsSurvey.NpsSurveyData();
        data.baseData = baseData;
        data.promptData = new PromptComponent.PromptComponentData();
        data.ratingData = new RatingComponent.RatingComponentData();
        data.commentData = new CommentComponent.CommentComponentData();
        data.promptData.title = sp.getCustomString(content.prompt.title);
        data.promptData.question = sp.getCustomString(content.prompt.question);
        data.promptData.yesButtonLabel = sp.getCustomString(content.prompt.yesLabel);
        data.promptData.noButtonLabel = sp.getCustomString(content.prompt.noLabel);
        data.ratingData.question = sp.getCustomString(content.rating.question);
        data.ratingData.isZeroBased = content.rating.isZeroBased;
        data.commentData.question = sp.getCustomString(content.comment.question);
        for (var _i = 0, _a = content.rating.ratingValuesAscending; _i < _a.length; _i++) {
            var value = _a[_i];
            var customString = sp.getCustomString(value);
            if (Utils.isNullOrUndefined(customString)) {
                return null;
            }
            ratingValuesAscending.push(customString);
        }
        data.ratingData.ratingValuesAscending = ratingValuesAscending;
        if (Utils.isNullOrUndefined(data.ratingData.question)
            || Utils.isNullOrUndefined(data.commentData.question)
            || Utils.isNullOrUndefined(data.promptData.title)
            || Utils.isNullOrUndefined(data.promptData.question)
            || Utils.isNullOrUndefined(data.promptData.yesButtonLabel)
            || Utils.isNullOrUndefined(data.promptData.noButtonLabel)
            || Utils.isNullOrUndefined(data.ratingData.ratingValuesAscending)) {
            return null;
        }
        return this.make(data);
    };
    NpsSurvey.make5Point = function (baseData, sp) {
        if (!baseData || !sp) {
            return null;
        }
        var data = new NpsSurvey.NpsSurveyData();
        data.baseData = baseData;
        data.ratingData = new RatingComponent.RatingComponentData();
        data.ratingData.isZeroBased = false;
        data.commentData = new CommentComponent.CommentComponentData();
        data.promptData = new PromptComponent.PromptComponentData();
        data.ratingData.question = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsRatingQuestion);
        data.commentData.question = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsCommentQuestion);
        data.promptData.title = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsPromptTitle);
        data.promptData.question = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsPromptQuestion);
        data.promptData.yesButtonLabel = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsPromptYesLabel);
        data.promptData.noButtonLabel = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsPromptNotNowLabel);
        var ratingValuesAscending = new Array(5);
        ratingValuesAscending[0] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps5RatingValue1);
        ratingValuesAscending[1] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps5RatingValue2);
        ratingValuesAscending[2] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps5RatingValue3);
        ratingValuesAscending[3] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps5RatingValue4);
        ratingValuesAscending[4] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps5RatingValue5);
        if (!data.ratingData.question
            || !data.commentData.question
            || !data.promptData.title
            || !data.promptData.question
            || !data.promptData.yesButtonLabel
            || !data.promptData.noButtonLabel
            || !ratingValuesAscending[0]
            || !ratingValuesAscending[1]
            || !ratingValuesAscending[2]
            || !ratingValuesAscending[3]
            || !ratingValuesAscending[4]) {
            return null;
        }
        data.ratingData.ratingValuesAscending = ratingValuesAscending;
        return this.make(data);
    };
    NpsSurvey.make11Point = function (baseData, sp) {
        if (!baseData || !sp) {
            return null;
        }
        var data = new NpsSurvey.NpsSurveyData();
        data.baseData = baseData;
        data.ratingData = new RatingComponent.RatingComponentData();
        data.ratingData.isZeroBased = true;
        data.commentData = new CommentComponent.CommentComponentData();
        data.promptData = new PromptComponent.PromptComponentData();
        data.ratingData.question = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsRatingQuestion);
        data.commentData.question = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsCommentQuestion);
        data.promptData.title = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsPromptTitle);
        data.promptData.question = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsPromptQuestion);
        data.promptData.yesButtonLabel = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsPromptYesLabel);
        data.promptData.noButtonLabel = sp.loadStringResource(IFloodgateStringProvider.StringType.NpsPromptNotNowLabel);
        var ratingValuesAscending = new Array(11);
        ratingValuesAscending[0] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue0);
        ratingValuesAscending[1] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue1);
        ratingValuesAscending[2] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue2);
        ratingValuesAscending[3] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue3);
        ratingValuesAscending[4] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue4);
        ratingValuesAscending[5] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue5);
        ratingValuesAscending[6] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue6);
        ratingValuesAscending[7] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue7);
        ratingValuesAscending[8] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue8);
        ratingValuesAscending[9] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue9);
        ratingValuesAscending[10] = sp.loadStringResource(IFloodgateStringProvider.StringType.Nps11RatingValue10);
        if (!data.ratingData.question
            || !data.commentData.question
            || !data.promptData.title
            || !data.promptData.question
            || !data.promptData.yesButtonLabel
            || !data.promptData.noButtonLabel
            || !ratingValuesAscending[0]
            || !ratingValuesAscending[1]
            || !ratingValuesAscending[2]
            || !ratingValuesAscending[3]
            || !ratingValuesAscending[4]
            || !ratingValuesAscending[5]
            || !ratingValuesAscending[6]
            || !ratingValuesAscending[7]
            || !ratingValuesAscending[8]
            || !ratingValuesAscending[9]
            || !ratingValuesAscending[10]) {
            return null;
        }
        data.ratingData.ratingValuesAscending = ratingValuesAscending;
        return this.make(data);
    };
    // @Override
    NpsSurvey.prototype.getType = function () {
        return ISurvey.Type.Nps;
    };
    // @Override
    NpsSurvey.prototype.getSurveyInfo = function () {
        return this.surveyInfo;
    };
    // @Override
    NpsSurvey.prototype.getCommentComponent = function () {
        return this.question;
    };
    // @Override
    NpsSurvey.prototype.getPromptComponent = function () {
        return this.prompt;
    };
    // @Override
    NpsSurvey.prototype.getRatingComponent = function () {
        return this.rating;
    };
    // @Override
    NpsSurvey.prototype.getComponent = function (componentType) {
        switch (componentType) {
            case ISurveyComponent.Type.Comment:
                return this.getCommentComponent();
            case ISurveyComponent.Type.Prompt:
                return this.getPromptComponent();
            case ISurveyComponent.Type.Rating:
                return this.getRatingComponent();
            default:
                return null;
        }
    };
    // @Override
    NpsSurvey.prototype.getDomElements = function (doc) {
        if (!doc) {
            throw new Error("Document must not be null");
        }
        var element = doc.createElement(ISurvey.DOM_NPS_TAGNAME);
        this.getSurveyInfo().getDomElements(doc).forEach(function (child) {
            if (child) {
                element.appendChild(child);
            }
        });
        this.getCommentComponent().getDomElements(doc).forEach(function (child) {
            if (child) {
                element.appendChild(child);
            }
        });
        this.getRatingComponent().getDomElements(doc).forEach(function (child) {
            if (child) {
                element.appendChild(child);
            }
        });
        return [element];
    };
    // @Override
    NpsSurvey.prototype.getJsonElements = function () {
        var result = {};
        result = Utils.overrideValues(this.getSurveyInfo().getJsonElements(), result);
        result = Utils.overrideValues(this.getCommentComponent().getJsonElements(), result);
        result = Utils.overrideValues(this.getRatingComponent().getJsonElements(), result);
        return result;
    };
    return NpsSurvey;
}());
(function (NpsSurvey) {
    /**
     * Data required for a Nps Survey
     */
    var NpsSurveyData = /** @class */ (function () {
        function NpsSurveyData() {
        }
        return NpsSurveyData;
    }());
    NpsSurvey.NpsSurveyData = NpsSurveyData;
})(NpsSurvey || (NpsSurvey = {}));
module.exports = NpsSurvey;

},{"../Api/IFloodgateStringProvider":8,"../Api/ISurvey":10,"../Api/ISurveyComponent":11,"../SurveyComponents/CommentComponent":25,"../SurveyComponents/PromptComponent":26,"../SurveyComponents/RatingComponent":27,"../Utils":36,"./SurveyDataSource":35}],35:[function(require,module,exports){
"use strict";
var GovernedChannel_1 = require("../GovernedChannel");
var ISurveyInfo = require("../ISurveyInfo");
var Utils = require("../Utils");
var SurveyDataSource = /** @class */ (function () {
    function SurveyDataSource(data) {
        if (Utils.isNullOrUndefined(data)) {
            throw new Error("data must not be null");
        }
        if (Utils.isNullOrUndefined(data.id) || data.id === "") {
            throw new Error("data.id must not be null or empty");
        }
        if (Utils.isNullOrUndefined(data.governedChannelType)) {
            data.governedChannelType = GovernedChannel_1.GovernedChannelType.getDefault();
        }
        if (Utils.isNullOrUndefined(data.expirationTimeUtc) || data.expirationTimeUtc === "") {
            throw new Error("data.expirationTimeUtc must not be null or empty");
        }
        if (Utils.isNullOrUndefined(data.activationEvent)) {
            throw new Error("data.activationEvent must not be null");
        }
        if (Utils.isNullOrUndefined(data.backEndIdentifier) || data.backEndIdentifier === "") {
            data.backEndIdentifier = data.id;
        }
        this.data = data;
    }
    // @Override
    SurveyDataSource.prototype.getId = function () {
        return this.data.id;
    };
    // @Override
    SurveyDataSource.prototype.getBackEndId = function () {
        return this.data.backEndIdentifier;
    };
    // @Override
    SurveyDataSource.prototype.getGovernedChannelType = function () {
        return this.data.governedChannelType;
    };
    // @Override
    SurveyDataSource.prototype.getRawStartTimeUtc = function () {
        return this.data.startTimeUtc;
    };
    // @Override
    SurveyDataSource.prototype.getStartTimeUtc = function () {
        if (Utils.isNullOrUndefined(this.data.startTimeUtc)) {
            return Utils.getDistantPast(); // Optional start date means the survey has started
        }
        var parsed = new Date(this.data.startTimeUtc);
        if (!Utils.isDate(parsed)) {
            return Utils.getDistantFuture(); // Badly specified start dates means the survey never starts
        }
        return parsed;
    };
    // @Override
    SurveyDataSource.prototype.getExpirationTimeUtc = function () {
        // Bad or missing expiration date means survey is always expired.
        if (Utils.isNullOrUndefined(this.data.expirationTimeUtc)) {
            return Utils.getDistantPast();
        }
        var parsed = new Date(this.data.expirationTimeUtc);
        if (!Utils.isDate(parsed)) {
            return Utils.getDistantPast();
        }
        return parsed;
    };
    // @Override
    SurveyDataSource.prototype.getRawExpirationTimeUtc = function () {
        return this.data.expirationTimeUtc;
    };
    // @Override
    SurveyDataSource.prototype.isActiveForDate = function (date) {
        if (Utils.isNullOrUndefined(date)) {
            return false;
        }
        return (date >= this.getStartTimeUtc() && date <= this.getExpirationTimeUtc());
    };
    // @Override
    SurveyDataSource.prototype.getActivationEvent = function () {
        return this.data.activationEvent;
    };
    // @Override
    SurveyDataSource.prototype.getPreferredLaunchType = function () {
        return this.data.preferredLaunchType;
    };
    // @Override
    SurveyDataSource.prototype.isAdditionalDataRequested = function (additionalDataToCheck) {
        for (var _i = 0, _a = this.data.additionalDataRequested; _i < _a.length; _i++) {
            var additionalData = _a[_i];
            if (additionalData === additionalDataToCheck) {
                return true;
            }
        }
        return false;
    };
    // @Override
    SurveyDataSource.prototype.getDomElements = function (doc) {
        if (!doc) {
            throw new Error("Document must not be null");
        }
        var typeElement = doc.createElement(ISurveyInfo.DOM_TYPE_TAGNAME);
        typeElement.appendChild(doc.createTextNode(ISurveyInfo.DOM_TYPE_VALUE));
        var idElement = doc.createElement(ISurveyInfo.DOM_ID_TAGNAME);
        idElement.appendChild(doc.createTextNode(this.getBackEndId()));
        return [typeElement, idElement];
    };
    // @Override
    SurveyDataSource.prototype.getJsonElements = function () {
        var surveyObject = {};
        surveyObject[ISurveyInfo.JSON_ID_KEYNAME] = this.getBackEndId();
        var result = {};
        result[ISurveyInfo.JSON_SURVEY_KEYNAME] = surveyObject;
        return result;
    };
    return SurveyDataSource;
}());
(function (SurveyDataSource) {
    /**
     * Basic data needed for all Surveys
     */
    var SurveyDataSourceData = /** @class */ (function () {
        function SurveyDataSourceData() {
            this.preferredLaunchType = ISurveyInfo.LaunchType.Default;
        }
        return SurveyDataSourceData;
    }());
    SurveyDataSource.SurveyDataSourceData = SurveyDataSourceData;
})(SurveyDataSource || (SurveyDataSource = {}));
module.exports = SurveyDataSource;

},{"../GovernedChannel":18,"../ISurveyInfo":22,"../Utils":36}],36:[function(require,module,exports){
"use strict";
/*
 * Utils.ts
 *
 * Module for utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Add time to a given date
 * Example, timeAdd(new Date(), 'minute', 5)  //returns 5 minutes from now
 * @param date  Date to start with
 * @param interval  One of: hour or h, minute or m, second or s
 * @param units  units of the given interval to add
 * @return date
 */
function timeAdd(date, interval, units) {
    switch (interval.toLowerCase()) {
        case "h":
        case "hour":
            return new Date(date.getTime() + (units * 3600000));
        case "m":
        case "minute":
            return new Date(date.getTime() + (units * 60000));
        case "s":
        case "second":
            return new Date(date.getTime() + (units * 1000));
        default:
            throw new Error("Invalid interval value of " + interval);
    }
}
exports.timeAdd = timeAdd;
/**
 * Check if an input value is a valid date, null or undefined return false.
 * @param input  input value
 * @return boolean
 */
function isDate(input) {
    if (Object.prototype.toString.call(input) === "[object Date]") {
        // it is a date
        if (!(isNaN(input.getTime()))) {
            return true;
        }
    }
    return false;
}
exports.isDate = isDate;
/**
 * Check if an input value is a valid value in the input enum
 * @param value  input value
 * @param input  input enum
 * Returns true if value exists in the enum
 */
function isEnumValue(value, input) {
    return (value in input);
}
exports.isEnumValue = isEnumValue;
/**
 * Check if an input value is a number
 * @param value: input value
 */
function isNumber(value) {
    return (value !== null && !isNaN(value) && isFinite(value));
}
exports.isNumber = isNumber;
/**
 * Check if an input value is null or undefined
 * @param value: input value
 */
function isNullOrUndefined(value) {
    return (value === null || value === undefined);
}
exports.isNullOrUndefined = isNullOrUndefined;
/**
 * Check if an input value is an object
 * @param value: input value
 */
function isObject(value) {
    return (value !== null && value !== undefined && (typeof value === "object"));
}
exports.isObject = isObject;
/**
 * Check if given value is a string
 * @param {any} value value
 */
function isString(value) {
    return (typeof value === "string");
}
exports.isString = isString;
/**
 * Check if value is an object
 * @param {any} value value
 */
function isBoolean(value) {
    return typeof (value) === "boolean";
}
exports.isBoolean = isBoolean;
/**
 * Returns a lower temporal boundary
 * @return date
 */
function getDistantPast() {
    // Corresponds to UTC 0001-12-30T00:00:00Z
    return new Date(-62104233600000);
}
exports.getDistantPast = getDistantPast;
/**
 * Get an upper temporal boundary
 * @return date
 */
function getDistantFuture() {
    // Corresponds to UTC 4001-01-01T00:00:00Z
    return new Date(64092211200000);
}
exports.getDistantFuture = getDistantFuture;
exports.MAX_DATE_MILLISECONDS = 8640000000000000;
exports.MIN_DATE_MILLISECONDS = -8640000000000000;
/**
 * Adds seconds to a date, if overflows returns Date(Number.Max_VALUE)
 *
 * @param date    date to add to
 * @param seconds seconds as number
 * @return Resulting date
 */
function addSecondsWithoutOverflow(date, seconds) {
    if (!date) {
        return null;
    }
    if (seconds < 0) {
        return subtractSecondsWithoutOverflow(date, -1 * seconds);
    }
    else {
        var milliseconds = date.getTime() + seconds * 1000;
        if (milliseconds < exports.MAX_DATE_MILLISECONDS) {
            return new Date(milliseconds);
        }
        else {
            return new Date(exports.MAX_DATE_MILLISECONDS);
        }
    }
}
exports.addSecondsWithoutOverflow = addSecondsWithoutOverflow;
/**
 * Subtracts seconds from a date, if overflows returns Date(Number.MIN_VALUE)
 *
 * @param date   date to subtract from
 * @param seconds seconds as number
 * @return Resulting date
 */
function subtractSecondsWithoutOverflow(date, seconds) {
    if (!date) {
        return null;
    }
    if (seconds < 0) {
        seconds = -seconds;
        return this.addSecondsWithoutOverflow(date, seconds);
    }
    var milliseconds = date.getTime() - (seconds * 1000);
    if (milliseconds > exports.MIN_DATE_MILLISECONDS) {
        return new Date(milliseconds);
    }
    else {
        return new Date(exports.MIN_DATE_MILLISECONDS);
    }
}
exports.subtractSecondsWithoutOverflow = subtractSecondsWithoutOverflow;
// region Language related
/**
 * Effectively un-anchored on the right side because tags can have many more trailing sub-parts than we care to extract
 * Refer to https://www.ietf.org/rfc/rfc5646.txt
 */
var LANGUAGE_AND_SCRIPT_TAG_PATTERN = "^" +
    // capture 1:language subtag
    "(" +
    "(?:[a-zA-Z]{2,3}(?:-[a-zA-Z]{3}){0,3})" + // 2-3 Alpha chars, followed by up to three optional extension tags, each of format -AAA, A=Alpha char
    "|" +
    "(?:[a-zA-Z]{4,8})" + // 4-Alpha chars (reserved in standard) or 5-8 Alpha chars
    ")" +
    "(?:" +
    "-" +
    // capture 2: optional script subtag (without leading dash), exactly 4 alpha chars
    "([a-zA-Z]{4})" + // 4-Alpha chars
    ")?" +
    // capture 3: optional region subtag (without leading dash), exactly 2 alpha chars or 3 digits
    "(?:-([a-zA-Z]{2}|[0-9]{3}))?" +
    "(" +
    // capture 4: any left-overs, rejecting remainder strings that don't end here or lead with a dash.
    "-.*" +
    ")?" +
    "$";
function isValidLanguageSubTag(subTag) {
    if (!subTag) {
        return false;
    }
    var extractedSubTag = extractLanguageSubtag(subTag);
    if (!extractedSubTag) {
        return false;
    }
    return extractedSubTag === subTag;
}
exports.isValidLanguageSubTag = isValidLanguageSubTag;
function extractLanguageSubtag(language) {
    if (!language) {
        return null;
    }
    var matches = language.match(LANGUAGE_AND_SCRIPT_TAG_PATTERN);
    if (!matches || matches.length < 1 || !isNullOrUndefined(matches[4])) {
        return null;
    }
    // return the first capture group which should be the original input if there is a match
    // For example, "en-US" input should return "en-US", and "en" input should return "en".
    return matches[0];
}
exports.extractLanguageSubtag = extractLanguageSubtag;
// endregion
/**
 * Create guid string
 */
function guid() {
    // Stitch in '4' in the third group
    return (randomHex4() + randomHex4() + "-" + randomHex4() + "-4" + randomHex4().substr(0, 3) + "-" + randomHex4() + "-"
        + randomHex4() + randomHex4() + randomHex4()).toLowerCase();
}
exports.guid = guid;
/**
 * Create random Hex4 string
 */
function randomHex4() {
    return (Math.floor(((1 + Math.random()) * 0x10000))).toString(16).substring(1);
}
/**
 * Create an array from input object values sorted by object key
 * @param Object input object
 * @return array
 */
function makeArrayFromObjectValuesSortedByKeyString(object) {
    var keys = Object.keys(object);
    keys.sort();
    var values = [];
    for (var id in keys) {
        if (keys.hasOwnProperty(id)) {
            var key = keys[id];
            values.push(object[key]);
        }
    }
    return values;
}
exports.makeArrayFromObjectValuesSortedByKeyString = makeArrayFromObjectValuesSortedByKeyString;
/**
 * Create a date object from an input string
 * @param Object input string
 * @return date
 */
function stringToDate(input) {
    if (!isString(input)) {
        return null;
    }
    var newDate = input ? new Date(input) : null;
    return isDate(newDate) ? newDate : null;
}
exports.stringToDate = stringToDate;
/**
 * Takes two objects (source, target) and returns the target object with values in the source added to it.
 * It overwrites any source properties which already exist in target.
 */
function overrideValues(sourceObject, targetobject) {
    if (!targetobject) {
        return targetobject;
    }
    var result = targetobject;
    if (sourceObject) {
        for (var field in sourceObject) {
            if (sourceObject.hasOwnProperty(field)) {
                result[field] = sourceObject[field];
            }
        }
    }
    return result;
}
exports.overrideValues = overrideValues;
/**
 * Test a string is in our supported ISO8601 UTC format of "yyyy-MM-ddTHH:mm:ssZ" and "yyyy-MM-ddTHH:mm:ss.fffZ"
 * @param input Input string to be evaluated.
 */
function isUtcDatetimeString(input) {
    if (!isString(input)) {
        return false;
    }
    var supportedUtcRegex = /^(\d{4}\-\d\d\-\d\dT\d\d:\d\d:\d\d(\.\d\d\d)?Z)$/;
    return supportedUtcRegex.test(input);
}
exports.isUtcDatetimeString = isUtcDatetimeString;
/**
 * Convert a date object to a string in ISO8601 UTC format supported by Floodgate ("yyyy-MM-ddTHH:mm:ssZ")
 * @param input Input date object
 */
function dateToShortUtcString(input) {
    if (!isDate(input)) {
        return null;
    }
    function pad(n) {
        return (n < 10) ? ("0" + n) : n.toString();
    }
    return input.getUTCFullYear() +
        "-" + pad(input.getUTCMonth() + 1) +
        "-" + pad(input.getUTCDate()) +
        "T" + pad(input.getUTCHours()) +
        ":" + pad(input.getUTCMinutes()) +
        ":" + pad(input.getUTCSeconds()) +
        "Z";
}
exports.dateToShortUtcString = dateToShortUtcString;

},{}],37:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));





}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":38}],38:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],39:[function(require,module,exports){
"use strict";
/**
 * App_Common.ts
 *
 * Common logic for entrypoints.
 */
exports.__esModule = true;
var UIStrings = require("./UIStrings/UIStrings");
var Version_1 = require("./Version");
var Configuration = require("./Configuration/Configuration");
var Window = require("./Window/Window");
var Logging = require("./Logging/Logging");
var Theme = require("./Theme");
var es6_promise_1 = require("es6-promise");
var APP_NAME = "OfficeFeedbackSDK";
/**
 * Has the SDK been initialized
 */
var initialized = false;
/**
 * Load the style sheet
 * @param url The url of the stylesheet
 */
function loadStylesheet(url) {
    "use strict";
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var entry = document.getElementsByTagName("script")[0];
    entry.parentNode.insertBefore(link, entry);
}
/**
 * Load the script and callback after it is loaded
 * @param url The url of the script
 * @param callback The callback
 */
function loadScript(url) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.async = true;
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    resolve();
                }
            };
        }
        else {
            script.onload = function () {
                resolve();
            };
        }
        script.onerror = function () {
            reject();
        };
        script.src = url;
        var entry = document.getElementsByTagName("script")[0];
        entry.parentNode.insertBefore(script, entry);
    });
}
/**
 * Initialize common modules
 * @param initOptions init options
 */
function initializeModules(initOptions) {
    Logging.initialize(initOptions.environment, APP_NAME, Version_1["default"], (initOptions.telemetryGroup) ? initOptions.telemetryGroup.audienceGroup : undefined, initOptions.appId.toString(), initOptions.sessionId, initOptions.build);
    Theme.initialize(initOptions.primaryColour, initOptions.secondaryColour);
}
/**
 * Set ui Strings.
 * @param data the ui strings
 */
function setUIStrings(data) {
    UIStrings.setUIStrings(data);
}
;
/**
 * Initialize
 */
function initialize() {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (!initialized) {
            if (!Window.get().OfficeBrowserFeedback.initOptions) {
                reject("Window.OfficeBrowserFeedback.initOptions not set");
                return;
            }
            Window.get().OfficeBrowserFeedback.sdkVersion = Version_1["default"];
            Configuration.get().setCommonInitOptions(Window.get().OfficeBrowserFeedback.initOptions);
            var initOptionsCommon_1 = Configuration.get().getCommonInitOptions();
            loadStylesheet(initOptionsCommon_1.stylesUrl);
            var intlFileUrl_1 = initOptionsCommon_1.intlUrl + initOptionsCommon_1.locale.toLowerCase() + "/" +
                initOptionsCommon_1.intlFilename;
            loadScript(intlFileUrl_1)
                .then(function onLoadScriptFulfilled() {
                if (!UIStrings.getUIStrings()) {
                    reject("UiStrings were not loaded from " + intlFileUrl_1);
                    return;
                }
                initializeModules(initOptionsCommon_1);
                initialized = true;
                resolve();
            })["catch"](function onLoadScriptRejected(err) {
                reject("Script load failed for " + intlFileUrl_1);
            });
        }
        else {
            resolve();
        }
    });
}
exports.initialize = initialize;
/**
 * Reset the module. Used in unit tests.
 */
function reset() {
    initialized = false;
}
exports.reset = reset;
/* Make the setUIStrings method available globally */
Window.setSetUiStrings(setUIStrings);
},{"./Configuration/Configuration":42,"./Logging/Logging":54,"./Theme":60,"./UIStrings/UIStrings":65,"./Version":85,"./Window/Window":87,"es6-promise":37}],40:[function(require,module,exports){
"use strict";
/**
 * App_Floodgate.ts
 *
 * The entry point for floodgate.
 */
exports.__esModule = true;
var App_Common = require("./App_Common");
var UI = require("./UI/UI");
var Configuration = require("./Configuration/Configuration");
var Window = require("./Window/Window");
var AdaptiveSurveyLauncherFactory_1 = require("./FloodgateCore/AdaptiveSurveyLauncherFactory");
var CustomUISurvey_1 = require("./FloodgateCore/UISurvey/CustomUISurvey");
var DummyUISurvey_1 = require("./FloodgateCore/UISurvey/DummyUISurvey");
var FloodgateEnvironmentProvider_1 = require("./FloodgateCore/FloodgateEnvironmentProvider");
var FloodgateStorageProvider_1 = require("./FloodgateCore/FloodgateStorageProvider");
var FloodgateStringProvider_1 = require("./FloodgateCore/FloodgateStringProvider");
var FloodgateTelemetryLogger_1 = require("./FloodgateCore/FloodgateTelemetryLogger");
var officefloodgatecore_1 = require("@ms-ofb/officefloodgatecore");
var CampaignDefinitionProvider_1 = require("@ms-ofb/officefloodgatecore/dist/src/Campaign/CampaignDefinitionProvider");
var Api_1 = require("@ms-ofb/officefloodgatecore/dist/src/Api/Api");
var es6_promise_1 = require("es6-promise");
/**
 * Has floodgate been initialized
 */
var initialized = false;
/**
 * Has the control been opened. Prevents more than one dialog being generated.
 */
var opened = false;
var engine;
/**
 * Initialize. Must be called before any other call to floodgate.
 * @returns A promise which will be rejected if the call fails.
 */
function initialize() {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (!FloodgateStorageProvider_1["default"].isStorageAvailable()) {
            reject("window.localStorage is not available.");
            return;
        }
        if (!initialized) {
            App_Common.initialize()
                .then(function onInitializeFulfilled() {
                Window.get().OfficeBrowserFeedback.floodgate = Window.get().OfficeBrowserFeedback.floodgate || {};
                var floodgateInitOptions = Window.get().OfficeBrowserFeedback.floodgate.initOptions;
                floodgateInitOptions = floodgateInitOptions || {};
                // Validate and copy campaign definitions to local storage 
                if (floodgateInitOptions.campaignDefinitions !== undefined) {
                    var filteredResult = CampaignDefinitionProvider_1.FilterValidCampaignDefinitions(floodgateInitOptions.campaignDefinitions);
                    if (filteredResult.error) {
                        reject("floodgate.initOptions.campaignDefinitions error: " + filteredResult.error);
                        return;
                    }
                    (new FloodgateStorageProvider_1["default"]()).write(Api_1.IFloodgateStorageProvider.FileType.CampaignDefinitions, JSON.stringify(floodgateInitOptions.campaignDefinitions));
                }
                Configuration.get().setFloodgateInitOptions(Window.get().OfficeBrowserFeedback.floodgate.initOptions);
                officefloodgatecore_1.FloodgateEngine.setTelemetryLogger(new FloodgateTelemetryLogger_1["default"]());
                initialized = true;
                resolve();
            })["catch"](function onInitializeRejected(err) {
                reject("Initialization failed: {" + err + "}");
            });
        }
        else {
            resolve();
        }
    });
}
exports.initialize = initialize;
/**
 * To support the multi-window scenario on web we need to initialize the engine on each resume.
 * Hence this seperate method which does make() and start() together.
 */
function start() {
    return new es6_promise_1.Promise(function (resolve, reject) {
        try {
            engine = officefloodgatecore_1.FloodgateEngine.make(Configuration.get().getCommonInitOptions().build ? Configuration.get().getCommonInitOptions().build : "", new AdaptiveSurveyLauncherFactory_1["default"](), Configuration.get().getFloodgateInitOptions().onSurveyActivatedCallback, new FloodgateStorageProvider_1["default"](), new FloodgateStringProvider_1["default"](), new FloodgateEnvironmentProvider_1["default"]());
            engine.start();
        }
        catch (e) {
            reject("Failed to start floodgate engine: " + e.toString());
            return;
        }
        resolve();
    });
}
exports.start = start;
/**
 * A proxy for the engine.stop() method for consistency with the start() method.
 */
function stop() {
    if (engine) {
        engine.stop();
    }
}
exports.stop = stop;
/**
 * Get the engine object
 * @returns the engine object
 */
function getEngine() {
    return engine;
}
exports.getEngine = getEngine;
/**
 * Display the given Survey with it's prompt
 * @param survey the survey to show
 * @returns A promise which will be rejected if the call fails.
 */
function showSurvey(survey) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (opened) {
            reject("Control already open");
            return;
        }
        Configuration.get().setFloodgateSurvey(survey ? survey : new DummyUISurvey_1["default"]());
        UI.createSurvey(function () { opened = false; });
        opened = true;
        resolve();
    });
}
exports.showSurvey = showSurvey;
/**
 * Method to allow users to launch a custom survey directly
 * @param survey the custom survey to show
 */
function showCustomSurvey(survey) {
    return showSurvey(new CustomUISurvey_1["default"](survey));
}
exports.showCustomSurvey = showCustomSurvey;
/**
 * Reset the floodgate module. Used in unit tests.
 */
function reset() {
    App_Common.reset();
    initialized = false;
    opened = false;
}
exports.reset = reset;
Window.setFloodgateShowCustomSurvey(showCustomSurvey);
Window.setFloodgateShowSurvey(showSurvey);
Window.setFloodgateGetEngine(getEngine);
Window.setFloodgateInitialize(initialize);
Window.setFloodgateStart(start);
Window.setFloodgateStop(stop);
},{"./App_Common":39,"./Configuration/Configuration":42,"./FloodgateCore/AdaptiveSurveyLauncherFactory":44,"./FloodgateCore/FloodgateEnvironmentProvider":45,"./FloodgateCore/FloodgateStorageProvider":46,"./FloodgateCore/FloodgateStringProvider":47,"./FloodgateCore/FloodgateTelemetryLogger":48,"./FloodgateCore/UISurvey/CustomUISurvey":49,"./FloodgateCore/UISurvey/DummyUISurvey":50,"./UI/UI":82,"./Window/Window":87,"@ms-ofb/officefloodgatecore":1,"@ms-ofb/officefloodgatecore/dist/src/Api/Api":5,"@ms-ofb/officefloodgatecore/dist/src/Campaign/CampaignDefinitionProvider":12,"es6-promise":37}],41:[function(require,module,exports){
"use strict";
/**
 * App_inAppFeedback.ts
 *
 * The entry point for inAppFeedback.
 */
exports.__esModule = true;
var App_Common = require("./App_Common");
var Configuration = require("./Configuration/Configuration");
var Logging = require("./Logging/Logging");
var UI = require("./UI/UI");
var Window = require("./Window/Window");
var es6_promise_1 = require("es6-promise");
/**
 * Has inAppFeedback been initialized
 */
var initialized = false;
/**
 * Initialize
 * @returns A promise which will be rejected if the call fails.
 */
function initialize() {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (!initialized) {
            App_Common.initialize()
                .then(function onInitializeFulfilled() {
                if (!Window.get().OfficeBrowserFeedback.initOptions) {
                    reject("Window.OfficeBrowserFeedback.initOptions not set");
                    return;
                }
                Configuration.get().setInAppFeedbackInitOptions(Window.get().OfficeBrowserFeedback.initOptions);
                initialized = true;
                resolve();
            })["catch"](function onInitializeRejected(err) { reject("Initialization failed: {" + err + "}"); });
        }
        else {
            resolve();
        }
    });
}
exports.initialize = initialize;
/**
 * Has the control been opened. Prevents more than one dialog being generated.
 */
var opened = false;
/**
 * Handler to launch the multi feedback dialog
 * @param launchOptions optional feedback properties
 * @returns A promise which will be rejected if the call fails.
 */
function multiFeedback(launchOptions) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (opened) {
            reject("Control already open");
            return;
        }
        initialize()
            .then(function onInitializeFulfilled() {
            Configuration.get().setInAppFeedbackLaunchOptions(launchOptions);
            UI.createBellyBandMulti(function () { opened = false; });
            Logging.getLogger().logEvent(Logging.EventIds.InApp.UI.Picker.Shown.VALUE, {
                IsBugEnabled: Configuration.get().getInAppFeedbackInitOptions().bugForm,
                IsIdeaEnabled: Configuration.get().getInAppFeedbackInitOptions().userVoice !== undefined
            });
            opened = true;
            resolve();
        })["catch"](function onInitializeRejected(err) { reject("Initialization failed: {" + err + "}"); });
    });
}
exports.multiFeedback = multiFeedback;
/**
 * Handler to launch the single feedback dialog
 * @param feedbackType the feedback type
 * @param launchOptions optional feedback properties
 * @returns A promise which will be rejected if the call fails.
 */
function singleFeedback(feedbackType, launchOptions) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (opened) {
            reject("Control already open");
            return;
        }
        var feedbackTypeEnum = Configuration.validateFeedbackType(feedbackType);
        initialize()
            .then(function onInitializeFulfilled() {
            Configuration.get().setInAppFeedbackLaunchOptions(launchOptions);
            UI.createBellyBandSingle(function () { opened = false; }, feedbackTypeEnum);
            Logging.getLogger().logEvent(Logging.EventIds.InApp.UI.Form.Shown.VALUE, {
                FeedbackType: feedbackTypeEnum
            });
            opened = true;
            resolve();
        })["catch"](function onInitializeRejected(err) { reject("Initialization failed: {" + err + "}"); });
    });
}
exports.singleFeedback = singleFeedback;
/**
 * Reset the inappfeedback module. Used in unit tests.
 */
function reset() {
    App_Common.reset();
    initialized = false;
    opened = false;
}
exports.reset = reset;
/* Make the FeedbackDialog methods available globally */
Window.setMultiFeedback(multiFeedback);
Window.setSingleFeedback(singleFeedback);
},{"./App_Common":39,"./Configuration/Configuration":42,"./Logging/Logging":54,"./UI/UI":82,"./Window/Window":87,"es6-promise":37}],42:[function(require,module,exports){
"use strict";
/**
 * Configuration.ts
 *
 * Module for logic relating to the sdk user configuration
 */
exports.__esModule = true;
var Utils = require("./../Utils");
var Constants = require("./../Constants");
var Localization = require("./../Localization");
/**
 * Class representing a configuration (user provided options)
 */
var Configuration = (function () {
    function Configuration() {
    }
    /**
     * Validate category options, default "show" to false if CategoryOptions is not provided.
     * @param categories Category options
     * @returns {ICategoryOptions} the validated CategoryOptions
     */
    Configuration.validateCategoryOptions = function (categories) {
        if (!categories) {
            return { show: false };
        }
        Utils.expectBoolean(categories.show, "categories.show");
        if (categories.customCategories) {
            Utils.expectArray(categories.customCategories, "categories.customCategories");
            for (var _i = 0, _a = categories.customCategories; _i < _a.length; _i++) {
                var customCategory = _a[_i];
                Utils.expectString(customCategory, "custom category '" + customCategory + "'");
                if (customCategory.length > 20) {
                    throw "custom category '" + customCategory + "' too long, max 20 characters.";
                }
            }
        }
        return categories;
    };
    Configuration.prototype.getCommonInitOptions = function () {
        return this.commonInitOptions;
    };
    Configuration.prototype.getInAppFeedbackInitOptions = function () {
        return this.inAppFeedbackInitOptions;
    };
    Configuration.prototype.getInAppFeedbackLaunchOptions = function () {
        return this.inAppFeedbackLaunchOptions;
    };
    Configuration.prototype.getFloodgateInitOptions = function () {
        return this.floodgateInitOptions;
    };
    Configuration.prototype.getFloodgateSurvey = function () {
        return this.floodgateSurvey;
    };
    /**
     * Set initOptions for common functionality.
     */
    Configuration.prototype.setCommonInitOptions = function (passedInitOptions) {
        Utils.expectObject(passedInitOptions, "passedInitOptions");
        var initOptions = {
            appId: passedInitOptions.appId,
            applicationGroup: passedInitOptions.applicationGroup || {},
            build: passedInitOptions.build,
            cid: passedInitOptions.cid,
            environment: passedInitOptions.environment,
            intlFilename: passedInitOptions.intlFilename,
            intlUrl: passedInitOptions.intlUrl,
            locale: passedInitOptions.locale,
            onError: passedInitOptions.onError,
            originalLocale: passedInitOptions.locale,
            primaryColour: passedInitOptions.primaryColour,
            secondaryColour: passedInitOptions.secondaryColour,
            sessionId: passedInitOptions.sessionId,
            stylesUrl: passedInitOptions.stylesUrl,
            telemetryGroup: passedInitOptions.telemetryGroup || {},
            userEmail: passedInitOptions.userEmail,
            userEmailConsentDefault: passedInitOptions.userEmailConsentDefault,
            webGroup: passedInitOptions.webGroup || {}
        };
        Utils.expectNumber(initOptions.appId, "initOptions.appId");
        if (!(initOptions.appId % 1 === 0 && initOptions.appId > 0)) {
            throw "initOptions.appId is not a positive integer: " + initOptions.appId;
        }
        Utils.expectString(initOptions.stylesUrl, "initOptions.stylesUrl");
        Utils.expectString(initOptions.intlUrl, "initOptions.intlUrl");
        if (initOptions.intlFilename !== undefined) {
            Utils.expectString(initOptions.intlFilename, "initOptions.intlFilename");
        }
        else {
            initOptions.intlFilename = "officebrowserfeedbackstrings.js";
        }
        Utils.expectNumber(initOptions.environment, "initOptions.environment");
        if (!(initOptions.environment === 1 || initOptions.environment === 0)) {
            throw "initOptions.environment has a bad value: " + initOptions.environment;
        }
        if (initOptions.userEmail !== undefined) {
            Utils.expectString(initOptions.userEmail, "initOptions.userEmail");
        }
        if (initOptions.userEmailConsentDefault !== undefined) {
            Utils.expectBoolean(initOptions.userEmailConsentDefault, "initOptions.userEmailConsentDefault");
        }
        if (initOptions.sessionId !== undefined) {
            Utils.expectString(initOptions.sessionId, "initOptions.sessionId");
        }
        else {
            initOptions.sessionId = "00000000-0000-0000-0000-000000000000";
        }
        // Copy sessionID over to telemetryGroup
        initOptions.telemetryGroup.processSessionId = initOptions.sessionId;
        if (initOptions.cid !== undefined) {
            Utils.expectString(initOptions.cid, "initOptions.cid");
            // Copy cid over to extendedManifestData of applicationGroup
            initOptions.applicationGroup.extendedManifestData = JSON.stringify({ cid: initOptions.cid });
        }
        if (initOptions.build !== undefined) {
            Utils.expectString(initOptions.build, "initOptions.build");
            var buildRegex = "^[0-9]{1,9}(\\.[0-9]{1,9})?(\\.[0-9]{1,9})?(\\.[0-9]{1,9})?$";
            if (!new RegExp(buildRegex).test(initOptions.build)) {
                initOptions.build = "0.0.0.0";
            }
        }
        else {
            initOptions.build = "0.0.0.0";
        }
        // Copy build over to telemetryGroup
        initOptions.telemetryGroup.officeBuild = initOptions.build;
        var hexColourRegex = new RegExp("^#[0-9a-f]{3}([0-9a-f]{3})?$", "i");
        if (initOptions.primaryColour !== undefined) {
            if (!hexColourRegex.test(initOptions.primaryColour)) {
                initOptions.primaryColour = undefined;
            }
        }
        if (initOptions.secondaryColour !== undefined) {
            if (!hexColourRegex.test(initOptions.secondaryColour)) {
                initOptions.secondaryColour = undefined;
            }
        }
        if (initOptions.locale !== undefined) {
            Utils.expectString(initOptions.locale, "initOptions.locale");
            initOptions.locale = Localization.validate(initOptions.locale);
        }
        else {
            initOptions.locale = "en";
        }
        if (initOptions.onError === undefined) {
            initOptions.onError = function (err) { return; };
        }
        this.commonInitOptions = initOptions;
    };
    /**
     * Set init options for inAppFeedback
     */
    Configuration.prototype.setInAppFeedbackInitOptions = function (passedInitOptions) {
        Utils.expectObject(passedInitOptions, "passedInitOptions");
        var initOptions = {
            bugForm: passedInitOptions.bugForm,
            onDismiss: passedInitOptions.onDismiss,
            screenshot: passedInitOptions.screenshot,
            userEmail: passedInitOptions.userEmail,
            userVoice: passedInitOptions.userVoice !== undefined ?
                {
                    url: passedInitOptions.userVoice.url
                } :
                undefined
        };
        if (initOptions.onDismiss === undefined) {
            initOptions.onDismiss = function (submitted) { return; };
        }
        if (initOptions.bugForm !== undefined) {
            Utils.expectBoolean(initOptions.bugForm, "initOptions.bugForm");
        }
        else {
            initOptions.bugForm = false;
        }
        if (initOptions.userEmail !== undefined) {
            Utils.expectString(initOptions.userEmail, "initOptions.userEmail");
        }
        if (initOptions.screenshot !== undefined) {
            Utils.expectBoolean(initOptions.screenshot, "initOptions.screenshot");
        }
        else {
            initOptions.screenshot = true;
        }
        if (initOptions.userVoice !== undefined) {
            Utils.expectObject(initOptions.userVoice, "initOptions.userVoice");
            Utils.expectString(initOptions.userVoice.url, "initOptions.userVoice.url");
        }
        this.inAppFeedbackInitOptions = initOptions;
    };
    /**
     * Set launch options for inAppFeedback
     */
    Configuration.prototype.setInAppFeedbackLaunchOptions = function (launchOptions) {
        if (!this.commonInitOptions) {
            throw "commonInitOptions not set";
        }
        if (!launchOptions) {
            launchOptions = {};
        }
        // Override any setting done in LaunchOptions for the metadataGroups
        this.commonInitOptions.applicationGroup = Utils.overrideValues(launchOptions.applicationGroup, this.commonInitOptions.applicationGroup);
        this.commonInitOptions.telemetryGroup = Utils.overrideValues(launchOptions.telemetryGroup, this.commonInitOptions.telemetryGroup);
        this.commonInitOptions.webGroup = Utils.overrideValues(launchOptions.webGroup, this.commonInitOptions.webGroup);
        launchOptions.categories = Configuration.validateCategoryOptions(launchOptions.categories);
        this.inAppFeedbackLaunchOptions = launchOptions;
    };
    /**
     * Set init options for floodgate
     */
    Configuration.prototype.setFloodgateInitOptions = function (passedInitOptions) {
        Utils.expectObject(passedInitOptions, "passedInitOptions");
        var initOptions = {
            autoDismiss: passedInitOptions.autoDismiss,
            campaignDefinitions: passedInitOptions.campaignDefinitions,
            onDismiss: passedInitOptions.onDismiss,
            onSurveyActivatedCallback: passedInitOptions.onSurveyActivatedCallback,
            uIStringGetter: passedInitOptions.uIStringGetter
        };
        if (initOptions.autoDismiss === undefined) {
            initOptions.autoDismiss = Constants.AutoDismissValues.NoAutoDismiss;
        }
        if (initOptions.onDismiss === undefined) {
            initOptions.onDismiss = function (campaignId, submitted) { return; };
        }
        if (initOptions.onSurveyActivatedCallback === undefined) {
            var defaultOnSurveyActivatedCallback = {
                onSurveyActivated: function (launcher) {
                    launcher.launch();
                }
            };
            initOptions.onSurveyActivatedCallback = defaultOnSurveyActivatedCallback;
        }
        if (initOptions.uIStringGetter === undefined) {
            initOptions.uIStringGetter = function (str) { return str; }; // By default return the string as is.
        }
        this.floodgateInitOptions = initOptions;
    };
    /**
     * Set the floodgate survey
     */
    Configuration.prototype.setFloodgateSurvey = function (survey) {
        this.floodgateSurvey = survey;
    };
    return Configuration;
}());
exports.Configuration = Configuration;
var configuration = new Configuration();
/**
 * Get the current configuration
 */
function get() {
    return configuration;
}
exports.get = get;
/**
 * Validate feedbackType
 * @param feedbackType feedbackType
 * @returns {Constants.FeedbackType} the validated feedbackType
 */
function validateFeedbackType(feedbackType) {
    Utils.expectString(feedbackType, "feedbackType");
    if (feedbackType === Constants.FeedbackType[Constants.FeedbackType.Smile]) {
        return Constants.FeedbackType.Smile;
    }
    else if (feedbackType === Constants.FeedbackType[Constants.FeedbackType.Frown]) {
        return Constants.FeedbackType.Frown;
    }
    else if (feedbackType === Constants.FeedbackType[Constants.FeedbackType.Bug]) {
        return Constants.FeedbackType.Bug;
    }
    else {
        throw "feedbackType should be one of Smile, Frown or Bug";
    }
}
exports.validateFeedbackType = validateFeedbackType;
},{"./../Constants":43,"./../Localization":52,"./../Utils":84}],43:[function(require,module,exports){
"use strict";
/**
* Constants.ts
*
* A module for all the constants.
*/
exports.__esModule = true;
/**
 * HTML attribute names
 */
var AttributeName = (function () {
    function AttributeName() {
    }
    AttributeName.AriaLabel = "aria-label";
    AttributeName.Class = "class";
    AttributeName.DataHtml2CanvasIgnore = "data-html2canvas-ignore";
    AttributeName.Disabled = "disabled";
    AttributeName.Fill = "fill";
    AttributeName.For = "for";
    AttributeName.Form = "form";
    AttributeName.Height = "height";
    AttributeName.HRef = "href";
    AttributeName.Id = "id";
    AttributeName.MaxLength = "maxlength";
    AttributeName.Name = "name";
    AttributeName.Placeholder = "placeholder";
    AttributeName.Points = "points";
    AttributeName.Rel = "rel";
    AttributeName.Role = "role";
    AttributeName.Source = "src";
    AttributeName.Stroke = "stroke";
    AttributeName.TabIndex = "tabindex";
    AttributeName.Target = "target";
    AttributeName.Transform = "transform";
    AttributeName.Type = "type";
    AttributeName.Value = "value";
    AttributeName.ViewBox = "viewBox";
    AttributeName.Width = "width";
    AttributeName.xlinkHref = "xlink:href";
    AttributeName.X = "x";
    AttributeName.Y = "y";
    return AttributeName;
}());
exports.AttributeName = AttributeName;
/**
 * HTML attribute values
 */
var AttributeValue = (function () {
    function AttributeValue() {
    }
    AttributeValue.BlankWindow = "_blank";
    AttributeValue.Button = "button";
    AttributeValue.Checkbox = "checkbox";
    AttributeValue.Checked = "checked";
    AttributeValue.False = "false";
    AttributeValue.Zero = "0";
    AttributeValue.Polite = "polite";
    AttributeValue.Radio = "radio";
    AttributeValue.Submit = "submit";
    AttributeValue.Text = "text";
    AttributeValue.TextAreaMaxLength = "1000";
    AttributeValue.True = "true";
    AttributeValue.Unchecked = "unchecked";
    AttributeValue.NoReferrer = "noreferrer";
    return AttributeValue;
}());
exports.AttributeValue = AttributeValue;
/**
 * URL Parameters
 */
var UrlParameters = (function () {
    function UrlParameters() {
    }
    UrlParameters.CLCID = "CLCID";
    return UrlParameters;
}());
exports.UrlParameters = UrlParameters;
/**
 * CSS classes
 */
var Classes = (function () {
    function Classes() {
    }
    Classes.CheckBox = "obf-CheckBox";
    Classes.FontSubtitle = "obf-FontSubtitle";
    Classes.FontText = "obf-FontText";
    Classes.FontSubText = "obf-FontSubText";
    Classes.FontSubSubText = "obf-FontSubSubText";
    Classes.Hidden = "obf-Hidden";
    Classes.Link = "obf-Link";
    Classes.MarginLeft60px = "obf-MarginLeft60px";
    Classes.NarrowLayout = "obf-NarrowLayout";
    Classes.PrivacyStatementLinkDiv = "obf-PrivacyStatementLinkDiv";
    Classes.Rtl = "obf-Rtl";
    Classes.Spinner = "obf-Spinner";
    Classes.SpinnerCircle = "obf-SpinnerCircle";
    Classes.SubmitButton = "obf-SubmitButton";
    Classes.TextInput = "obf-TextInput";
    Classes.Visible = "obf-Visible";
    // rating control
    Classes.Rating = "obf-Rating";
    Classes.RatingGraphic = "obf-RatingGraphic";
    Classes.RatingGraphicFilled = "obf-RatingGraphic-Filled";
    // choice group control
    Classes.ChoiceGroup = "obf-ChoiceGroup";
    Classes.ChoiceGroupIcon = "obf-ChoiceGroupIcon";
    // region BellyBand
    Classes.OverallAnchor = "obf-OverallAnchor";
    Classes.OverallAnchorActive = "obf-OverallAnchorActive";
    Classes.OverallImage = "obf-OverallImage";
    Classes.OverallText = "obf-OverallText";
    Classes.SingleLayout = "obf-SingleLayout";
    Classes.ShowRightBorder = "obf-ShowRightBorder";
    Classes.SlideLeft = "obf-slideLeft";
    Classes.TextAlignLeft = "obf-TextAlignLeft";
    Classes.FormContainer = "obf-FormContainer";
    // form classes
    Classes.FormQuestionMiddleText = "obf-FormQuestionMiddleText";
    Classes.FormMiddleText = "obf-FormMiddleText";
    Classes.FormCategoriesDropdown = "obf-FormCategoriesDropdown";
    Classes.FormComment = "obf-FormComment";
    Classes.FormRatingContainer = "obf-FormRatingContainer";
    Classes.FormRatingLabel = "obf-FormRatingLabel";
    Classes.FormRating = "obf-FormRating";
    Classes.FormEmailInput = "obf-FormEmailInput";
    Classes.FormBottomContainer = "obf-FormBottomContainer";
    Classes.FormSubmitButtonContainer = "obf-FormSubmitButtonContainer";
    Classes.FormScreenshotContainer = "obf-FormScreenshotContainer";
    Classes.FormScreenshotLabel = "obf-FormScreenshotLabel";
    Classes.FormScreenshotCheckbox = "obf-FormScreenshotCheckbox";
    // email textbox classes
    Classes.TFormEmailCheckbox = "obf-TFormEmailCheckbox";
    Classes.TFormEmailLabel = "obf-TFormEmailLabel ";
    // email checkbox classes
    Classes.EmailCheckBoxLabel = "obf-EmailCheckBoxLabel";
    // endregion
    // region Toast
    Classes.Toast = "obf-Toast";
    return Classes;
}());
exports.Classes = Classes;
/**
 * HTML element ids
 */
var IDs = (function () {
    function IDs() {
    }
    // region BellyBand
    IDs.ColumnSeparatorDiv = "obf-ColumnSeparatorDiv";
    IDs.OverallAnchorsContainer = "obf-OverallAnchorsContainer";
    IDs.OverallFrownAnchor = "obf-OverallFrownAnchor";
    IDs.OverallFrownDiv = "obf-OverallFrownDiv";
    IDs.OverallFrownImage = "obf-OverallFrownImage";
    IDs.OverallFrownText = "obf-OverallFrownText";
    IDs.OverallSmileAnchor = "obf-OverallSmileAnchor";
    IDs.OverallSmileDiv = "obf-OverallSmileDiv";
    IDs.OverallSmileImage = "obf-OverallSmileImage";
    IDs.OverallSmileText = "obf-OverallSmileText";
    IDs.OverallIdeaAnchor = "obf-OverallIdeaAnchor";
    IDs.OverallIdeaDiv = "obf-OverallIdeaDiv";
    IDs.OverallIdeaImage = "obf-OverallIdeaImage";
    IDs.OverallIdeaText = "obf-OverallIdeaText";
    IDs.OverallBugAnchor = "obf-OverallBugAnchor";
    IDs.OverallBugDiv = "obf-OverallBugDiv";
    IDs.OverallBugImage = "obf-OverallBugImage";
    IDs.OverallBugText = "obf-OverallBugText";
    IDs.QuestionLeftText = "obf-QuestionLeftText";
    IDs.LeftFormContainer = "obf-LeftFormContainer";
    IDs.MainContainer = "obf-MainContainer";
    IDs.MainContentHolder = "obf-MainContentHolder";
    IDs.MiddleFormContainer = "obf-MiddleFormContainer";
    IDs.OverlayBackground = "obf-OverlayBackground";
    IDs.PrivacyStatementLink = "obf-PrivacyStatementLink";
    IDs.FirstTabbable = "obf-FirstTabbable";
    IDs.LastTabbable = "obf-LastTabbable";
    // Single form ids
    IDs.SingleFormContainer = "obf-SingleFormContainer";
    IDs.SingleFormQuestionMiddleText = "obf-SingleFormQuestionMiddleText";
    IDs.SingleFormCategoriesDropdown = "obf-SingleFormCategoriesDropdown";
    IDs.SingleFormComment = "obf-SingleFormComment";
    IDs.SingleFormEmailInput = "obf-SingleFormEmailInput";
    IDs.SingleFormRating = "obf-SingleFormRating";
    IDs.SingleFormScreenshotCheckbox = "obf-SingleFormScreenshotCheckbox";
    IDs.SingleFormSubmitButton = "obf-SingleFormSubmitButton";
    IDs.SingleFormSubmitButtonSpinner = "obf-SingleFormSubmitButtonSpinner";
    // Basic form ids
    IDs.BasicFormContainer = "obf-BasicFormContainer";
    IDs.BasicFormQuestionMiddleText = "obf-BasicFormQuestionMiddleText";
    IDs.BasicFormCategoriesDropdown = "obf-BasicFormCategoriesDropdown";
    IDs.BasicFormComment = "obf-BasicFormComment";
    IDs.BasicFormEmailInput = "obf-BasicFormEmailInput";
    IDs.BasicFormRating = "obf-BasicFormRating";
    IDs.BasicFormScreenshotCheckbox = "obf-BasicFormScreenshotCheckbox";
    IDs.BasicFormSubmitButton = "obf-BasicFormSubmitButton";
    IDs.BasicFormSubmitButtonSpinner = "obf-BasicFormSubmitButtonSpinner";
    // UserVoice form ids
    IDs.UserVoiceFormContainer = "obf-UserVoiceFormContainer";
    IDs.UserVoiceFormGoButton = "obf-UserVoiceFormGoButton";
    // endregion
    // region Toast
    IDs.ToastContainer = "obf-ToastContainer";
    IDs.ToastCancel = "obf-ToastCancel";
    // Prompt ids
    IDs.TPromptContainer = "obf-TPromptContainer";
    IDs.TPromptTitle = "obf-TPromptTitle";
    IDs.TPromptText = "obf-TPromptText";
    // Survey ids
    IDs.TFormContainer = "obf-TFormContainer";
    IDs.TFormTitle = "obf-TFormTitle";
    IDs.TFormRating = "obf-TFormRating";
    IDs.TFormComment = "obf-TFormComment";
    IDs.TFormEmailTextBox = "obf-TFormEmailTextBox";
    IDs.TFormEmailCheckBox = "obf-TFormEmailCheckBox";
    IDs.TFormEmailLabel = "obf-TFormEmailLabel";
    IDs.TFormSubmitButton = "obf-TFormSubmitButton";
    IDs.TFormSubmitButtonSpinner = "obf-TFormSubmitButtonSpinner";
    IDs.TFormSubmitButtonContainer = "obf-TFormSubmitButtonContainer";
    return IDs;
}());
exports.IDs = IDs;
/**
 * Keys
 */
var Keys = (function () {
    function Keys() {
    }
    Keys.Esc = 27;
    Keys.Tab = 9;
    return Keys;
}());
exports.Keys = Keys;
/**
 * Values for types of feedback that go into the json
 * Also used to determine the FormTemplate used on each one of the feedback types.
 */
var FeedbackType;
(function (FeedbackType) {
    FeedbackType[FeedbackType["Smile"] = 0] = "Smile";
    FeedbackType[FeedbackType["Frown"] = 1] = "Frown";
    FeedbackType[FeedbackType["Idea"] = 2] = "Idea";
    FeedbackType[FeedbackType["Bug"] = 3] = "Bug";
})(FeedbackType = exports.FeedbackType || (exports.FeedbackType = {}));
/**
 * Values for the environment
 */
var Environment;
(function (Environment) {
    Environment[Environment["Production"] = 0] = "Production";
    Environment[Environment["Int"] = 1] = "Int";
})(Environment = exports.Environment || (exports.Environment = {}));
/**
 * Values for autodismiss
 */
var AutoDismissValues;
(function (AutoDismissValues) {
    AutoDismissValues[AutoDismissValues["NoAutoDismiss"] = 0] = "NoAutoDismiss";
    AutoDismissValues[AutoDismissValues["SevenSeconds"] = 1] = "SevenSeconds";
    AutoDismissValues[AutoDismissValues["FourteenSeconds"] = 2] = "FourteenSeconds";
    AutoDismissValues[AutoDismissValues["TwentyOneSeconds"] = 3] = "TwentyOneSeconds";
    AutoDismissValues[AutoDismissValues["TwentyEightSeconds"] = 4] = "TwentyEightSeconds";
})(AutoDismissValues = exports.AutoDismissValues || (exports.AutoDismissValues = {}));
/**
 * HTML tags
 */
var Tags = (function () {
    function Tags() {
    }
    Tags.Anchor = "A";
    Tags.Button = "button";
    Tags.Defs = "defs";
    Tags.Div = "div";
    Tags.FieldSet = "fieldset";
    Tags.Form = "form";
    Tags.Img = "img";
    Tags.Input = "input";
    Tags.Label = "label";
    Tags.Legend = "legend";
    Tags.Option = "option";
    Tags.Polygon = "polygon";
    Tags.Select = "select";
    Tags.Span = "span";
    Tags.Svg = "svg";
    Tags.TextArea = "textarea";
    Tags.Use = "use";
    return Tags;
}());
exports.Tags = Tags;
/**
 * URLs
 */
var Urls = (function () {
    function Urls() {
    }
    /**
     * Link to the feedback Privacy Statement
     */
    Urls.PrivacyStatementLink = "http://go.microsoft.com/fwlink/?LinkID=390004";
    return Urls;
}());
exports.Urls = Urls;
},{}],44:[function(require,module,exports){
"use strict";
/**
 * Survey launcher factory for Web SDK
 */
exports.__esModule = true;
var UISurvey_1 = require("./../FloodgateCore/UISurvey/UISurvey");
var Window = require("./../Window/Window");
var AdaptiveSurveyLauncherFactory = (function () {
    function AdaptiveSurveyLauncherFactory() {
    }
    AdaptiveSurveyLauncherFactory.prototype.makeSurveyLauncher = function (survey) {
        return new RudeSurveyLauncher(survey);
    };
    return AdaptiveSurveyLauncherFactory;
}());
exports["default"] = AdaptiveSurveyLauncherFactory;
var RudeSurveyLauncher = (function () {
    function RudeSurveyLauncher(survey) {
        this.survey = survey;
    }
    RudeSurveyLauncher.prototype.launch = function () {
        Window.get().OfficeBrowserFeedback.floodgate.showSurvey(new UISurvey_1["default"](this.survey));
    };
    return RudeSurveyLauncher;
}());
},{"./../FloodgateCore/UISurvey/UISurvey":51,"./../Window/Window":87}],45:[function(require,module,exports){
"use strict";
/**
 * Implementation for IFloodgateEnvironmentProvider for web SDK.
 * We pass the SDK's internal locale here and not the one which the host app specifies.
 */
exports.__esModule = true;
var Configuration = require("./../Configuration/Configuration");
var FloodgateEnvironmentProvider = (function () {
    function FloodgateEnvironmentProvider() {
    }
    FloodgateEnvironmentProvider.prototype.getLanguage = function () {
        return Configuration.get().getCommonInitOptions().originalLocale;
    };
    return FloodgateEnvironmentProvider;
}());
exports["default"] = FloodgateEnvironmentProvider;
},{"./../Configuration/Configuration":42}],46:[function(require,module,exports){
"use strict";
/**
 * Implementation of IFloodgateStorageProvider for Web SDK
 */
exports.__esModule = true;
var Api_1 = require("@ms-ofb/officefloodgatecore/dist/src/Api/Api");
var Window = require("./../Window/Window");
var Logging = require("./../Logging/Logging");
var FileType = Api_1.IFloodgateStorageProvider.FileType;
var fileTypeToKeyMap = {};
fileTypeToKeyMap[FileType.CampaignDefinitions.toString()] = "obf-CampaignDefinitions";
fileTypeToKeyMap[FileType.CampaignStates.toString()] = "obf-CampaignStates";
fileTypeToKeyMap[FileType.FloodgateSettings.toString()] = "obf-FloodgateSettings";
fileTypeToKeyMap[FileType.GovernedChannelStates.toString()] = "obf-GovernedChannelStates";
fileTypeToKeyMap[FileType.SurveyActivationStats.toString()] = "obf-SurveyActivationStats";
fileTypeToKeyMap[FileType.SurveyEventActivityStats.toString()] = "obf-SurveyEventActivityStats";
var FloodgateStorageProvider = (function () {
    function FloodgateStorageProvider() {
    }
    /**
     * Code to detect localStorage presence.
     * Copied from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
     */
    FloodgateStorageProvider.isStorageAvailable = function () {
        try {
            var x = "__storage_test__";
            Window.get().localStorage.setItem(x, x);
            Window.get().localStorage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                // acknowledge QuotaExceededError only if there's something already stored
                Window.get().localStorage.length !== 0;
        }
    };
    /**
     * Lock the file to prevent access from another process.
     */
    FloodgateStorageProvider.prototype.fileLock = function (fileType) {
        // JS runs on a single thread in the browser.
        return;
    };
    /**
     * Unlock the file.
     */
    FloodgateStorageProvider.prototype.fileUnlock = function (fileType) {
        // JS runs on a single thread in the browser.
        return;
    };
    /**
     * Read the file
     */
    FloodgateStorageProvider.prototype.read = function (fileType) {
        if (!(fileType in FileType) || !fileTypeToKeyMap.hasOwnProperty(fileType.toString())) {
            return "";
        }
        var storageKey = fileTypeToKeyMap[fileType];
        var result;
        try {
            result = Window.get().localStorage.getItem(storageKey);
        }
        catch (e) {
            Logging.getLogger().logEvent(Logging.EventIds.Survey.Floodgate.FileRead.Failed.VALUE, {
                ErrorMessage: e.toString(),
                FileName: storageKey
            });
            return "";
        }
        return result;
    };
    /**
     * Write to the file
     */
    FloodgateStorageProvider.prototype.write = function (fileType, content) {
        if (!(fileType in FileType) || !fileTypeToKeyMap.hasOwnProperty(fileType.toString())) {
            return;
        }
        var storageKey = fileTypeToKeyMap[fileType];
        try {
            Window.get().localStorage.setItem(storageKey, content);
        }
        catch (e) {
            Logging.getLogger().logEvent(Logging.EventIds.Survey.Floodgate.FileWrite.Failed.VALUE, {
                ErrorMessage: e.toString(),
                FileName: storageKey
            });
            return;
        }
    };
    return FloodgateStorageProvider;
}());
exports["default"] = FloodgateStorageProvider;
},{"./../Logging/Logging":54,"./../Window/Window":87,"@ms-ofb/officefloodgatecore/dist/src/Api/Api":5}],47:[function(require,module,exports){
"use strict";
/**
 * Implementation of IFloodgateStringProvider for Web SDK
 */
exports.__esModule = true;
var Api = require("@ms-ofb/officefloodgatecore/dist/src/Api/Api");
var UIStrings = require("./../UIStrings/UIStrings");
var Configuration = require("./../Configuration/Configuration");
/* tslint:disable:max-line-length */
var FloodgateStringProvider = (function () {
    function FloodgateStringProvider() {
    }
    FloodgateStringProvider.prototype.loadStringResource = function (stringId) {
        var uiStrings = UIStrings.getUIStrings();
        switch (stringId) {
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue0): return uiStrings.Floodgate.Nps.Rating.Points11Value0;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue1): return uiStrings.Floodgate.Nps.Rating.Points11Value1;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue2): return uiStrings.Floodgate.Nps.Rating.Points11Value2;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue3): return uiStrings.Floodgate.Nps.Rating.Points11Value3;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue4): return uiStrings.Floodgate.Nps.Rating.Points11Value4;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue5): return uiStrings.Floodgate.Nps.Rating.Points11Value5;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue6): return uiStrings.Floodgate.Nps.Rating.Points11Value6;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue7): return uiStrings.Floodgate.Nps.Rating.Points11Value7;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue8): return uiStrings.Floodgate.Nps.Rating.Points11Value8;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue9): return uiStrings.Floodgate.Nps.Rating.Points11Value9;
            case (Api.IFloodgateStringProvider.StringType.Nps11RatingValue10): return uiStrings.Floodgate.Nps.Rating.Points11Value10;
            case (Api.IFloodgateStringProvider.StringType.Nps5RatingValue1): return uiStrings.Floodgate.Nps.Rating.Points5Value1;
            case (Api.IFloodgateStringProvider.StringType.Nps5RatingValue2): return uiStrings.Floodgate.Nps.Rating.Points5Value2;
            case (Api.IFloodgateStringProvider.StringType.Nps5RatingValue3): return uiStrings.Floodgate.Nps.Rating.Points5Value3;
            case (Api.IFloodgateStringProvider.StringType.Nps5RatingValue4): return uiStrings.Floodgate.Nps.Rating.Points5Value4;
            case (Api.IFloodgateStringProvider.StringType.Nps5RatingValue5): return uiStrings.Floodgate.Nps.Rating.Points5Value5;
            case (Api.IFloodgateStringProvider.StringType.NpsRatingQuestion): return uiStrings.Floodgate.Nps.Rating.Question;
            case (Api.IFloodgateStringProvider.StringType.NpsCommentQuestion): return uiStrings.Floodgate.Nps.Comment.Question;
            case (Api.IFloodgateStringProvider.StringType.NpsPromptNotNowLabel): return uiStrings.Floodgate.Nps.Prompt.No;
            case (Api.IFloodgateStringProvider.StringType.NpsPromptQuestion): return uiStrings.Floodgate.Nps.Prompt.Question;
            case (Api.IFloodgateStringProvider.StringType.NpsPromptTitle): return uiStrings.Floodgate.Nps.Prompt.Title;
            case (Api.IFloodgateStringProvider.StringType.NpsPromptYesLabel): return uiStrings.Floodgate.Nps.Prompt.Yes;
            default:
                return "";
        }
    };
    FloodgateStringProvider.prototype.getCustomString = function (str) {
        return Configuration.get().getFloodgateInitOptions().uIStringGetter(str);
    };
    return FloodgateStringProvider;
}());
exports["default"] = FloodgateStringProvider;
},{"./../Configuration/Configuration":42,"./../UIStrings/UIStrings":65,"@ms-ofb/officefloodgatecore/dist/src/Api/Api":5}],48:[function(require,module,exports){
"use strict";
/**
 * Implementation of IFloodgateTelemetryLogger for Web SDK
 */
exports.__esModule = true;
var Logging = require("../Logging/Logging");
var IFloodgateTelemetryLogger = (function () {
    function IFloodgateTelemetryLogger() {
    }
    /**
     * Log that a survey's trigger was met.
     * @param campaignId Id of the campaign the survey belongs to.
     * @param surveyId Id of the survey.
     * @param surveyType Type of the survey.
     */
    IFloodgateTelemetryLogger.prototype.log_TriggerMet = function (campaignId, surveyId, surveyType) {
        Logging.getLogger().logEvent(Logging.EventIds.Survey.Floodgate.TriggerMet.VALUE, {
            CampaignId: campaignId,
            SurveyId: surveyId,
            SurveyType: surveyType
        });
    };
    /**
     * Log that a user was selected(nominated) for a survey
     * @param campaignId Id of the campaign the survey belongs to.
     * @param surveyId Id of the survey.
     * @param surveyType Type of the survey.
     */
    IFloodgateTelemetryLogger.prototype.log_UserSelected = function (campaignId, surveyId, surveyType) {
        Logging.getLogger().logEvent(Logging.EventIds.Survey.Floodgate.UserSelected.VALUE, {
            CampaignId: campaignId,
            SurveyId: surveyId,
            SurveyType: surveyType
        });
    };
    /**
     * Log that campaign definitions failed to load.
     * @param errorMessage error message
     */
    IFloodgateTelemetryLogger.prototype.log_CampaignLoad_Failed = function (errorMessage) {
        Logging.getLogger().logEvent(Logging.EventIds.Survey.Floodgate.CampaignLoad.Failed.VALUE, {
            ErrorMessage: errorMessage
        });
    };
    return IFloodgateTelemetryLogger;
}());
exports["default"] = IFloodgateTelemetryLogger;
},{"../Logging/Logging":54}],49:[function(require,module,exports){
"use strict";
/**
 * IUISurvey implementation based on an ICustomSurvey object
 */
exports.__esModule = true;
var Utils = require("../../Utils");
var CustomUISurvey = (function () {
    function CustomUISurvey(survey) {
        this.comment = "";
        this.ratingIndex = -1;
        this.showPrompt = survey.showPrompt;
        this.showEmailRequest = Utils.isBoolean(survey.showEmailRequest) ? survey.showEmailRequest : false;
        this.survey = survey;
    }
    CustomUISurvey.prototype.getPromptQuestion = function () {
        return this.survey.promptQuestion;
    };
    CustomUISurvey.prototype.getTitle = function () {
        return this.survey.title;
    };
    CustomUISurvey.prototype.getPromptYesButtonText = function () {
        return this.survey.promptYesButtonText;
    };
    CustomUISurvey.prototype.getPromptNoButtonText = function () {
        return this.survey.promptNoButtonText;
    };
    CustomUISurvey.prototype.getRatingValuesAscending = function () {
        return this.survey.ratingValuesAscending;
    };
    CustomUISurvey.prototype.getRatingQuestion = function () {
        return this.survey.ratingQuestion;
    };
    CustomUISurvey.prototype.getCommentQuestion = function () {
        return this.survey.commentQuestion;
    };
    CustomUISurvey.prototype.setValues = function (ratingIndex, comment) {
        this.comment = comment;
        if (this.isRatingIndexValid(ratingIndex)) {
            this.ratingIndex = ratingIndex;
        }
        else {
            this.ratingIndex = -1;
        }
    };
    CustomUISurvey.prototype.getJsonElements = function () {
        var result = {};
        result.comment = this.comment;
        result.rating = this.getNormalizedRatingScore();
        result.survey = {
            surveyId: this.getCampaignId()
        };
        return result;
    };
    CustomUISurvey.prototype.getSurveyType = function () {
        return this.survey.surveyType;
    };
    CustomUISurvey.prototype.getCampaignId = function () {
        return this.survey.campaignId;
    };
    CustomUISurvey.prototype.getId = function () {
        return this.getCampaignId();
    };
    CustomUISurvey.prototype.isRatingIndexValid = function (index) {
        return (index >= 0 && index < this.survey.ratingValuesAscending.length);
    };
    CustomUISurvey.prototype.getNormalizedRatingScore = function () {
        if (!this.isRatingIndexValid(this.ratingIndex)) {
            return -1;
        }
        if (this.survey.isZeroBased) {
            return (this.ratingIndex) / (this.survey.ratingValuesAscending.length - 1);
        }
        else {
            return (this.ratingIndex + 1.0) / this.survey.ratingValuesAscending.length;
        }
    };
    return CustomUISurvey;
}());
exports["default"] = CustomUISurvey;
},{"../../Utils":84}],50:[function(require,module,exports){
"use strict";
/**
 * Dummy IUISurvey implementation without dependancy on officefloodgatecore
 */
exports.__esModule = true;
var Utils = require("../../Utils");
var Api = require("@ms-ofb/officefloodgatecore/dist/src/Api/Api");
var DummySurvey = (function () {
    function DummySurvey() {
        this.showPrompt = true;
        this.showEmailRequest = true;
        this.comment = "";
    }
    DummySurvey.prototype.getPromptQuestion = function () {
        return "Prompt question?";
    };
    DummySurvey.prototype.getTitle = function () {
        return "Title";
    };
    DummySurvey.prototype.getPromptYesButtonText = function () {
        return "Yes";
    };
    DummySurvey.prototype.getPromptNoButtonText = function () {
        return "No";
    };
    DummySurvey.prototype.getRatingValuesAscending = function () {
        return ["worst", "worse", "ok", "better", "best"];
    };
    DummySurvey.prototype.getRatingQuestion = function () {
        return "Rating question?";
    };
    DummySurvey.prototype.getCommentQuestion = function () {
        return "Comment question?";
    };
    DummySurvey.prototype.setValues = function (selectedIndex, comment) {
        if (comment) {
            this.comment = comment;
        }
        if (Utils.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex <= 4) {
            this.rating = selectedIndex / 4.0;
        }
    };
    DummySurvey.prototype.getJsonElements = function () {
        var result = {};
        if (this.comment) {
            result.comment = this.comment;
        }
        if (this.rating) {
            result.rating = this.rating;
        }
        return result;
    };
    DummySurvey.prototype.getSurveyType = function () {
        return Api.ISurvey.Type.Nps;
    };
    DummySurvey.prototype.getCampaignId = function () {
        return "10000000-0000-0000-0000-000000000000";
    };
    DummySurvey.prototype.getId = function () {
        return "00000000-0000-0000-0000-000000000000";
    };
    return DummySurvey;
}());
exports["default"] = DummySurvey;
},{"../../Utils":84,"@ms-ofb/officefloodgatecore/dist/src/Api/Api":5}],51:[function(require,module,exports){
"use strict";
/**
 * An implementation of IUISurvey based on floodgate.core INpsSurvey
 */
exports.__esModule = true;
var Api = require("@ms-ofb/officefloodgatecore/dist/src/Api/Api");
var UISurvey = (function () {
    function UISurvey(survey) {
        this.showPrompt = true;
        this.showEmailRequest = false;
        if (!survey) {
            throw Error("survey must not be null");
        }
        else {
            this.survey = survey;
        }
        var promptComponent = survey.getComponent(Api.ISurveyComponent.Type.Prompt);
        var commentComponent = survey.getComponent(Api.ISurveyComponent.Type.Comment);
        var ratingComponent = survey.getComponent(Api.ISurveyComponent.Type.Rating);
        if (promptComponent) {
            this.prompt = promptComponent;
        }
        else {
            throw Error("prompt component must not be null");
        }
        // Check for additonalDataRequested options
        this.showEmailRequest = survey.getSurveyInfo().isAdditionalDataRequested(Api.ISurveyInfo.AdditionalDataType.EmailAddress);
        if (commentComponent) {
            this.comment = commentComponent;
        }
        else {
            throw Error("comment component must not be null");
        }
        if (ratingComponent) {
            this.rating = ratingComponent;
        }
        else {
            throw Error("rating component must not be null");
        }
    }
    UISurvey.prototype.getPromptQuestion = function () {
        return this.prompt.getQuestion();
    };
    UISurvey.prototype.getTitle = function () {
        return this.prompt.getTitle();
    };
    UISurvey.prototype.getPromptYesButtonText = function () {
        return this.prompt.getYesButtonText();
    };
    UISurvey.prototype.getPromptNoButtonText = function () {
        return this.prompt.getNoButtonText();
    };
    UISurvey.prototype.getRatingValuesAscending = function () {
        return this.rating.getRatingValuesAscending();
    };
    UISurvey.prototype.getRatingQuestion = function () {
        return this.rating.getQuestion();
    };
    UISurvey.prototype.getCommentQuestion = function () {
        return this.comment.getQuestion();
    };
    UISurvey.prototype.setValues = function (selectedIndex, comment) {
        this.rating.setSelectedRatingIndex(selectedIndex);
        this.comment.setSubmittedText(comment);
    };
    UISurvey.prototype.getJsonElements = function () {
        return this.survey.getJsonElements();
    };
    UISurvey.prototype.getSurveyType = function () {
        return this.survey.getType();
    };
    UISurvey.prototype.getCampaignId = function () {
        return this.survey.getSurveyInfo().getBackEndId();
    };
    UISurvey.prototype.getId = function () {
        return this.survey.getSurveyInfo().getId();
    };
    return UISurvey;
}());
exports["default"] = UISurvey;
},{"@ms-ofb/officefloodgatecore/dist/src/Api/Api":5}],52:[function(require,module,exports){
"use strict";
/**
* Localization.ts
*
* Module for Localization
*/
exports.__esModule = true;
/**
 * List of supported Locales
 * REMINDER: update readme to match the list below if change is made
 */
var supportedLocales = [
    "af",
    "am",
    "ar",
    "as",
    "az",
    "be",
    "bg",
    "bn-BD",
    "bn-IN",
    "bs",
    "ca",
    "ca-Es-VALENCIA",
    "chr-Cher",
    "cs",
    "cy",
    "da",
    "de",
    "el",
    "en-GB",
    "es",
    "es-MX",
    "et",
    "eu",
    "fa",
    "fi",
    "fil",
    "fr",
    "fr-CA",
    "ga",
    "gd",
    "gl",
    "gu",
    "ha-Latn-NG",
    "he",
    "hi",
    "hr",
    "hu",
    "hy",
    "id",
    "is",
    "it",
    "ja",
    "ka",
    "kk",
    "km-KH",
    "kn",
    "ko",
    "kok",
    "ky",
    "lb",
    "lo",
    "lt",
    "lv",
    "mi",
    "mk",
    "ml",
    "mn",
    "mr",
    "ms",
    "mt",
    "nb-NO",
    "ne",
    "nl",
    "nn-NO",
    "or",
    "pa",
    "pl",
    "prs",
    "pt-BR",
    "pt-PT",
    "quz",
    "ro",
    "ru",
    "sd",
    "si",
    "sk",
    "sl",
    "sq",
    "sr-Cyrl-BA",
    "sr-Cyrl-RS",
    "sr-Latn-RS",
    "sv",
    "sw",
    "ta",
    "te",
    "th",
    "tk",
    "tr",
    "tt",
    "ug",
    "uk",
    "ur",
    "uz-Latn-UZ",
    "vi",
    "zh-Hans",
    "zh-Hant",
];
var localeVariantToSupportedlocaleMap = {
    "ZH-CN": "zh-Hans",
    "ZH-HK": "zh-Hant",
    "ZH-MO": "zh-Hant",
    "ZH-SG": "zh-Hans",
    "ZH-TW": "zh-Hant"
};
function validate(locale) {
    var localeUpperCase = locale.toLocaleUpperCase();
    // support for Chinese ll-cc, VSO Bug 1583389
    if (localeUpperCase in localeVariantToSupportedlocaleMap) {
        return localeVariantToSupportedlocaleMap[localeUpperCase];
    }
    // return supported locale if exact match found
    for (var _i = 0, supportedLocales_1 = supportedLocales; _i < supportedLocales_1.length; _i++) {
        var supportedLocale = supportedLocales_1[_i];
        if (supportedLocale.toUpperCase() === localeUpperCase) {
            return supportedLocale;
        }
    }
    var localePartOne = localeUpperCase.split("-")[0];
    // return supported "ll" if exact match not found, but "ll" matches
    for (var _a = 0, supportedLocales_2 = supportedLocales; _a < supportedLocales_2.length; _a++) {
        var supportedLocale = supportedLocales_2[_a];
        if (supportedLocale.toUpperCase() === localePartOne) {
            return supportedLocale;
        }
    }
    // default everything else to en
    return "en";
}
exports.validate = validate;
},{}],53:[function(require,module,exports){
"use strict";
/**
 * Constants.ts
 *
 * Module to hold logging-related constants
 */
exports.__esModule = true;
var EventIds = (function () {
    function EventIds() {
    }
    EventIds.InApp = (_a = (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.UI = (_b = (function () {
                function class_2() {
                }
                return class_2;
            }()),
            _b.Picker = (_c = (function () {
                    function class_3() {
                    }
                    return class_3;
                }()),
                _c.Shown = (_d = (function () {
                        function class_4() {
                        }
                        return class_4;
                    }()),
                    _d.VALUE = { name: "InApp_UI_Picker_Shown" },
                    _d),
                _c),
            _b.Form = (_e = (function () {
                    function class_5() {
                    }
                    return class_5;
                }()),
                _e.Shown = (_f = (function () {
                        function class_6() {
                        }
                        return class_6;
                    }()),
                    _f.VALUE = { name: "InApp_UI_Form_Shown" },
                    _f),
                _e.Submit = (_g = (function () {
                        function class_7() {
                        }
                        return class_7;
                    }()),
                    _g.VALUE = { name: "InApp_UI_Form_Submit" },
                    _g),
                _e),
            _b),
        _a);
    EventIds.Survey = (_h = (function () {
            function class_8() {
            }
            return class_8;
        }()),
        _h.UI = (_j = (function () {
                function class_9() {
                }
                return class_9;
            }()),
            _j.Prompt = (_k = (function () {
                    function class_10() {
                    }
                    return class_10;
                }()),
                _k.Shown = (_l = (function () {
                        function class_11() {
                        }
                        return class_11;
                    }()),
                    _l.VALUE = { name: "Survey_UI_Prompt_Shown" },
                    _l),
                _k),
            _j.Form = (_m = (function () {
                    function class_12() {
                    }
                    return class_12;
                }()),
                _m.Shown = (_o = (function () {
                        function class_13() {
                        }
                        return class_13;
                    }()),
                    _o.VALUE = { name: "Survey_UI_Form_Shown" },
                    _o),
                _m.Submit = (_p = (function () {
                        function class_14() {
                        }
                        return class_14;
                    }()),
                    _p.VALUE = { name: "Survey_UI_Form_Submit" },
                    _p),
                _m),
            _j),
        _h.Floodgate = (_q = (function () {
                function class_15() {
                }
                return class_15;
            }()),
            _q.TriggerMet = (_r = (function () {
                    function class_16() {
                    }
                    return class_16;
                }()),
                _r.VALUE = { name: "Survey_Floodgate_TriggerMet" },
                _r),
            _q.UserSelected = (_s = (function () {
                    function class_17() {
                    }
                    return class_17;
                }()),
                _s.VALUE = { name: "Survey_Floodgate_UserSelected" },
                _s),
            _q.CampaignLoad = (_t = (function () {
                    function class_18() {
                    }
                    return class_18;
                }()),
                _t.Failed = (_u = (function () {
                        function class_19() {
                        }
                        return class_19;
                    }()),
                    _u.VALUE = { name: "Survey_Floodgate_CampaignLoad_Failed" },
                    _u),
                _t),
            _q.FileWrite = (_v = (function () {
                    function class_20() {
                    }
                    return class_20;
                }()),
                _v.Failed = (_w = (function () {
                        function class_21() {
                        }
                        return class_21;
                    }()),
                    _w.VALUE = { name: "Survey_Floodgate_FileWrite_Failed" },
                    _w),
                _v),
            _q.FileRead = (_x = (function () {
                    function class_22() {
                    }
                    return class_22;
                }()),
                _x.Failed = (_y = (function () {
                        function class_23() {
                        }
                        return class_23;
                    }()),
                    _y.VALUE = { name: "Survey_Floodgate_FileRead_Failed" },
                    _y),
                _x),
            _q),
        _h);
    EventIds.Shared = (_z = (function () {
            function class_24() {
            }
            return class_24;
        }()),
        _z.Upload = (_0 = (function () {
                function class_25() {
                }
                return class_25;
            }()),
            _0.Failed = (_1 = (function () {
                    function class_26() {
                    }
                    return class_26;
                }()),
                _1.VALUE = { name: "Shared_Upload_Failed" },
                _1),
            _0),
        _z.Screenshot = (_2 = (function () {
                function class_27() {
                }
                return class_27;
            }()),
            _2.Render = (_3 = (function () {
                    function class_28() {
                    }
                    return class_28;
                }()),
                _3.Failed = (_4 = (function () {
                        function class_29() {
                        }
                        return class_29;
                    }()),
                    _4.VALUE = { name: "Shared_Screenshot_Render_Failed" },
                    _4),
                _3.Success = (_5 = (function () {
                        function class_30() {
                        }
                        return class_30;
                    }()),
                    _5.VALUE = { name: "Shared_Screenshot_Render_Success" },
                    _5),
                _3),
            _2.GetContent = (_6 = (function () {
                    function class_31() {
                    }
                    return class_31;
                }()),
                _6.Failed = (_7 = (function () {
                        function class_32() {
                        }
                        return class_32;
                    }()),
                    _7.DefaultImage = (_8 = (function () {
                            function class_33() {
                            }
                            return class_33;
                        }()),
                        _8.Returned = (_9 = (function () {
                                function class_34() {
                                }
                                return class_34;
                            }()),
                            _9.VALUE = { name: "Shared_Screenshot_GetContent_Failed_DefaultImage_Returned" },
                            _9),
                        _8),
                    _7),
                _6),
            _2),
        _z);
    return EventIds;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
}());
exports.EventIds = EventIds;
},{}],54:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Constants_1 = require("./../Constants");
var Contracts_1 = require("./Telemetry/Contracts");
var Utils = require("./../Utils");
var TelemetryLoggerFactory_1 = require("./Telemetry/TelemetryLoggerFactory");
var Constants_2 = require("./Constants");
exports.EventIds = Constants_2.EventIds;
var NAMESPACE = "Office_Feedback";
var logger;
/**
 * Initialize the logging module
 * @param environment environment
 * @param appName app name
 * @param appVersion app version
 * @param audienceGroup audience group
 * @param hostId host id
 * @param hostSessionId host session Id
 * @param hostVersion host version
 */
function initialize(environment, appName, appVersion, audienceGroup, hostId, hostSessionId, hostVersion) {
    logger = new Logger(TelemetryLoggerFactory_1["default"].create(TokenManager.getTenantToken(environment), NAMESPACE, new Contracts_1.App(appName, appVersion), new Contracts_1.Session(Utils.guid()), new Contracts_1.Host(hostId, hostSessionId, hostVersion), new Contracts_1.Release(audienceGroup)));
}
exports.initialize = initialize;
/**
 * Get the logger object
 */
function getLogger() {
    return logger;
}
exports.getLogger = getLogger;
/**
 * Class representing a logger for the feedback SDK
 */
var Logger = (function () {
    function Logger(telemetryLogger) {
        if (!telemetryLogger) {
            throw new Error("telemetryLogger must not be null");
        }
        this.telemetryLogger = telemetryLogger;
    }
    /**
     * Log an event
     * @param eventId event Id
     * @param customProperties custom properties to add to the log
     */
    Logger.prototype.logEvent = function (eventId, customProperties) {
        if (!eventId) {
            throw new Error("eventId must not be null");
        }
        customProperties = customProperties || {};
        customProperties[Logger.EVENT_ID] = eventId.name;
        this.telemetryLogger.logEvent(Logger.EVENT_NAME, customProperties);
    };
    Logger.EVENT_NAME = "SDK";
    Logger.EVENT_ID = "EventId";
    return Logger;
}());
exports.Logger = Logger;
var TokenManager = (function () {
    function TokenManager() {
    }
    TokenManager.getTenantToken = function (environment) {
        if (environment === Constants_1.Environment.Production) {
            return TokenManager.TENANT_TOKEN_PRODUCTION;
        }
        else {
            return TokenManager.TENANT_TOKEN_PRE_PRODUCTION;
        }
    };
    TokenManager.TENANT_TOKEN_PRODUCTION = "d79e824386c4441cb8c1d4ae15690526-bd443309-5494-444a-aba9-0af9eef99f84-7360"; // "Office Feedback" Prod Aria tenant
    TokenManager.TENANT_TOKEN_PRE_PRODUCTION = "2bf6a2ffddca4a80a892a0b182132961-625cb102-8b0c-480e-af53-92e48695d08d-7736"; // "Office Feedback" Sandbox Aria tenant
    return TokenManager;
}());
},{"./../Constants":43,"./../Utils":84,"./Constants":53,"./Telemetry/Contracts":57,"./Telemetry/TelemetryLoggerFactory":58}],55:[function(require,module,exports){
"use strict";
/**
* Aria.ts
*
* Module for wrapper around Aria
*/
exports.__esModule = true;
var aria = require("./../../thirdparty/aria-webjs-compact-sdk-1.2.0");
function AWT() { return aria.AWT; }
exports.AWT = AWT;
;
},{"./../../thirdparty/aria-webjs-compact-sdk-1.2.0":88}],56:[function(require,module,exports){
"use strict";
/**
 * An Aria-based logger
 */
exports.__esModule = true;
var Aria = require("./Aria");
var Contracts_1 = require("./Contracts");
var AriaTelemetryLogger = (function () {
    function AriaTelemetryLogger(tenantToken, namespace, app, session, host, release) {
        if (!tenantToken) {
            throw new Error("tenantToken must not be null");
        }
        if (!namespace) {
            throw new Error("namespace must not be null");
        }
        if (!app) {
            throw new Error("app must not be null");
        }
        if (!session) {
            throw new Error("session must not be null");
        }
        Aria.AWT().initialize(tenantToken);
        this.namespace = namespace;
        this.oesApp = app;
        this.oesSession = session;
        this.oesHost = host;
        this.oesRelease = release;
        this.sequence = 1; // Sequence starts at 1 not 0
    }
    AriaTelemetryLogger.setApp = function (properties, app) {
        properties["App.Name"] = app.getName();
        properties["App.Platform"] = app.getPlatform();
        properties["App.Version"] = app.getVersion();
    };
    AriaTelemetryLogger.setSession = function (properties, session) {
        properties["Session.Id"] = session.getId();
    };
    AriaTelemetryLogger.setHost = function (properties, host) {
        if (host) {
            properties["Host.Id"] = host.getId();
            // To be GDPR compliant do not log Host.SessionId
            properties["Host.Version"] = host.getVersion();
        }
    };
    AriaTelemetryLogger.setEvent = function (properties, event) {
        properties["Event.Name"] = event.getName();
        properties["Event.Id"] = event.getId();
        properties["Event.Source"] = event.getSource();
        properties["Event.SchemaVersion"] = event.getSchemaVersion();
        properties["Event.Sequence"] = event.getSequence();
    };
    AriaTelemetryLogger.setRelease = function (properties, release) {
        if (release) {
            properties["Release.AudienceGroup"] = release.getAudienceGroup();
        }
    };
    AriaTelemetryLogger.prototype.logEvent = function (eventName, customProperties) {
        if (!eventName) {
            throw new Error("eventName must not be null");
        }
        var oesEvent = new Contracts_1.Event(this.namespace + AriaTelemetryLogger.EVENT_NAME_DELIMITER + eventName, this.oesSession.getId(), this.sequence);
        var ariaProperties = {};
        if (customProperties != null) {
            for (var key in customProperties) {
                if (customProperties.hasOwnProperty(key)) {
                    ariaProperties[AriaTelemetryLogger.CUSTOM_PROPERTIES_FIELD_PREFIX + key] = customProperties[key];
                }
            }
        }
        AriaTelemetryLogger.setApp(ariaProperties, this.oesApp);
        AriaTelemetryLogger.setSession(ariaProperties, this.oesSession);
        AriaTelemetryLogger.setHost(ariaProperties, this.oesHost);
        AriaTelemetryLogger.setRelease(ariaProperties, this.oesRelease);
        AriaTelemetryLogger.setEvent(ariaProperties, oesEvent);
        Aria.AWT().logEvent({
            name: oesEvent.getName(),
            properties: ariaProperties
        });
        this.sequence++;
    };
    // Event.name is set as namespace<DELIMITER>eventName
    AriaTelemetryLogger.EVENT_NAME_DELIMITER = "_";
    AriaTelemetryLogger.CUSTOM_PROPERTIES_FIELD_PREFIX = "Data.";
    return AriaTelemetryLogger;
}());
exports["default"] = AriaTelemetryLogger;
},{"./Aria":55,"./Contracts":57}],57:[function(require,module,exports){
"use strict";
/**
 * Contracts enforced by OfficeEventSchema (OES)
 */
exports.__esModule = true;
var App = (function () {
    function App(name, version) {
        if (!name) {
            throw new Error("name must not be null");
        }
        if (!version) {
            throw new Error("version must not be null");
        }
        this.name = name;
        this.version = version;
    }
    App.prototype.getName = function () {
        return this.name;
    };
    App.prototype.getPlatform = function () {
        return App.PLATFORM;
    };
    App.prototype.getVersion = function () {
        return this.version;
    };
    App.PLATFORM = "Web";
    return App;
}());
exports.App = App;
var Session = (function () {
    function Session(id) {
        if (!id) {
            throw new Error("id must not be null");
        }
        this.id = id;
    }
    Session.prototype.getId = function () {
        return this.id;
    };
    return Session;
}());
exports.Session = Session;
var Host = (function () {
    function Host(id, sessionId, version) {
        this.id = id;
        this.sessionId = sessionId;
        this.version = version;
    }
    Host.prototype.getId = function () {
        return this.id;
    };
    Host.prototype.getSessionId = function () {
        return this.sessionId;
    };
    Host.prototype.getVersion = function () {
        return this.version;
    };
    return Host;
}());
exports.Host = Host;
var Event = (function () {
    function Event(name, sessionId, sequence) {
        if (!name) {
            throw new Error("name must not be null");
        }
        if (!sessionId) {
            throw new Error("sessionId must not be null");
        }
        if ((!sequence && sequence !== 0) || sequence < 0) {
            throw new Error("sequence must not be negative");
        }
        this.name = name;
        this.id = sessionId + Event.ID_DELIMITER + sequence;
        this.sequence = sequence;
    }
    Event.prototype.getName = function () {
        return this.name;
    };
    Event.prototype.getId = function () {
        return this.id;
    };
    Event.prototype.getSource = function () {
        return Event.SOURCE;
    };
    Event.prototype.getSchemaVersion = function () {
        return Event.SCHEMA_VERSION;
    };
    Event.prototype.getSequence = function () {
        return this.sequence;
    };
    // Id is set to sessionId<DELIMITER>sequence
    Event.ID_DELIMITER = ".";
    Event.SOURCE = "MsoThin";
    Event.SCHEMA_VERSION = 1;
    return Event;
}());
exports.Event = Event;
var Release = (function () {
    function Release(audienceGroup) {
        this.audienceGroup = audienceGroup;
    }
    Release.prototype.getAudienceGroup = function () {
        return this.audienceGroup;
    };
    return Release;
}());
exports.Release = Release;
},{}],58:[function(require,module,exports){
"use strict";
/**
 * Factory to return ITelemetryLogger objects
 */
exports.__esModule = true;
var AriaTelemetryLogger_1 = require("./AriaTelemetryLogger");
var TelemetryLoggerFactory = (function () {
    function TelemetryLoggerFactory() {
    }
    TelemetryLoggerFactory.create = function (tenantToken, namespace, app, session, host, release) {
        return new AriaTelemetryLogger_1["default"](tenantToken, namespace, app, session, host, release);
    };
    return TelemetryLoggerFactory;
}());
exports["default"] = TelemetryLoggerFactory;
},{"./AriaTelemetryLogger":56}],59:[function(require,module,exports){
"use strict";
/**
* Screenshot.ts
*
* A module for screenshot related logic.
* Note: It uses the htnl2canvas package. The package could be used as is, it is not packaged correctly for browserify.
* Using it without browserify would have polluted the global namespace by overriding "window.html2canvas".
* Until these issues get fixed the code has been changed to pollute window.OfficeBrowserFeedback.html2canvas instead.
*/
exports.__esModule = true;
var Window = require("./Window/Window");
/**
 * Create screenshot
 */
function createScreenShot() {
    var html2canvas = Window.get().OfficeBrowserFeedback.html2canvas();
    return html2canvas(document.body, { background: "#ffffff" });
}
exports.createScreenShot = createScreenShot;
},{"./Window/Window":87}],60:[function(require,module,exports){
"use strict";
/**
* Theme.ts
*
* Module for the UI Theme
*/
exports.__esModule = true;
var Constants = require("./Constants");
var defaultPrimaryColour = "#0167B0";
var defaultSecondaryColour = "#194789";
/**
 * Init
 * @param {string} primaryColour Primary Colour
 * @param {string} secondaryColour Secondary Colour
 */
function initialize(primaryColour, secondaryColour) {
    if (primaryColour === void 0) { primaryColour = undefined; }
    if (secondaryColour === void 0) { secondaryColour = undefined; }
    if (!primaryColour) {
        primaryColour = defaultPrimaryColour;
    }
    if (!secondaryColour) {
        secondaryColour = defaultSecondaryColour;
    }
    var sheet = document.createElement("style");
    sheet.textContent =
        "." + Constants.Classes.OverallAnchor + ":hover { background-color: " + secondaryColour + " } " +
            ("." + Constants.Classes.OverallAnchorActive + " { background-color: " + primaryColour + " } ") +
            ("." + Constants.Classes.SpinnerCircle + " { background-color: " + primaryColour + " } ") +
            (
            // tslint:disable-next-line:max-line-length
            "." + Constants.Classes.ChoiceGroup + " input[type=radio]:checked+label>." + Constants.Classes.ChoiceGroupIcon + " { border-color: " + primaryColour + " } ") +
            (
            // tslint:disable-next-line:max-line-length
            "." + Constants.Classes.ChoiceGroup + " input[type=radio]:hover+label>." + Constants.Classes.ChoiceGroupIcon + " { border-color: " + secondaryColour + " } ") +
            (
            // tslint:disable-next-line:max-line-length
            "." + Constants.Classes.ChoiceGroup + " input[type=radio]:checked+label>." + Constants.Classes.ChoiceGroupIcon + ">span { background-color: " + primaryColour + " } ") +
            ("." + Constants.Classes.SubmitButton + " { background-color: " + primaryColour + " } ") +
            ("." + Constants.Classes.SubmitButton + ":hover { background-color: " + secondaryColour + " } ") +
            ("." + Constants.Classes.Link + " { color: " + primaryColour + " } ") +
            ("." + Constants.Classes.Link + ":hover { color: " + secondaryColour + " } ") +
            ("#" + Constants.IDs.TPromptTitle + " { color: " + primaryColour + " } ") +
            ("#" + Constants.IDs.TFormTitle + " { color: " + primaryColour + " } ");
    document.body.appendChild(sheet);
}
exports.initialize = initialize;
},{"./Constants":43}],61:[function(require,module,exports){
"use strict";
/**
 * Manifest.ts
 * Module for managing the manifest file
 */
exports.__esModule = true;
var Constants_1 = require("./../../Constants");
var Manifest = (function () {
    function Manifest(manifestType, appId, submitTime, type, clientFeedbackId, applicationGroup, telemetryGroup, webGroup) {
        this.manifestData = {
            appId: appId,
            application: applicationGroup,
            clientFeedbackId: clientFeedbackId,
            manifestType: manifestType,
            source: "Client",
            submitTime: submitTime,
            telemetry: telemetryGroup,
            type: sanitizeType(type),
            web: webGroup
        };
    }
    Manifest.prototype.setComment = function (comment) {
        this.manifestData.comment = comment;
    };
    Manifest.prototype.setEmail = function (email) {
        this.manifestData.email = email;
    };
    Manifest.prototype.setCategory = function (category) {
        this.manifestData.telemetry = this.manifestData.telemetry || {};
        this.manifestData.telemetry.featureArea = category;
    };
    /**
     * Set freeform custom values in manifest. Throws if values are already set.
     * @param values the values as a JS object
     */
    Manifest.prototype.setValues = function (values) {
        if (values) {
            for (var field in values) {
                if (values.hasOwnProperty(field)) {
                    if (this.manifestData.hasOwnProperty(field)) {
                        throw Error("Key '" + field + "' already exists in manifest.");
                    }
                    this.manifestData[field] = values[field];
                }
            }
        }
    };
    Manifest.prototype.getContent = function () {
        return new Blob([JSON.stringify(this.manifestData)], { type: "application/json" });
    };
    return Manifest;
}());
exports.Manifest = Manifest;
function sanitizeType(type) {
    if (type === "Survey") {
        return type;
    }
    else {
        return Constants_1.FeedbackType[type];
    }
}
},{"./../../Constants":43}],62:[function(require,module,exports){
"use strict";
/**
 * Screenshot.ts
 * Module for managing the screenshot file
 */
exports.__esModule = true;
var Logging = require("./../../Logging/Logging");
var Screenshot = (function () {
    function Screenshot(screenshot) {
        this.screenshot = screenshot;
    }
    Screenshot.prototype.getContent = function () {
        var imgString;
        try {
            imgString = this.screenshot.toDataURL("image/jpeg").split(",")[1];
        }
        catch (e) {
            Logging.getLogger().logEvent(Logging.EventIds.Shared.Screenshot.GetContent.Failed.DefaultImage.Returned.VALUE, { ErrorMessage: e.toString() });
            // return an image with "Screenshot cannot be captured" message
            imgString = "iVBORw0KGgoAAAANSUhEUgAAAN0AAAA+AQMAAACV2ox1AAAABGdBTUEAALGPC/xhBQAAAAZQTFRFAAAA////pdmf3QAAAAlwSFlzAAAOwgAADsIBFShKgAAAAjtJREFUSMfV1M1rE0EUAHDBa5r8A9vkL6giFiI0JH+Ih9KLx8TaukkJugShHgrJzYvkVPQkUqgwSePLEELaU+zBg8JKVvSQQNydlsadwCQzziRZ82ETxYMfc3gD8+MxjzcfV8T80f0vkQ8i68tAPSMSQ0PkI6QDpEPkZBHy1Wp1/zjni2lrZq2T2uikDG17A54Hr0vsvwXIl3WXt02zeIHQBSq3DxHk7VO55zIFgLLrcmaaQBGiqCwQArBVQTbNZODNBB5Ee2EEr5eGiDG4k5mcqcy+Ksh+N8K2+bRI1Z68fRMVoV+XmcFwpQJZGohpkds1WtjppGLaq51a2b8yp310UW9/H8VfRj68CIKRsWCFPCCEM419S4bSAOmPmdb3TBrQ4lmnt9n4/Hiv5fTunsOzXbJfLR2rU3Fd5ugOe9mw0lvNOCNxyDdIHkpHCv0S3a+MS0yT+4wkAKx1gBJeVxeMRhSeNZpXJfY+zqAVl+g0mCFRJMgs6oy9+MCMrWZaJJwiWFjuWcIShf+Wk2W9e59OHu21WPdsswZNLKs9wV77mJiaMVbBQ+/1jGZDofFLuOBU/jzG6OQKnkLOZ5EvwolMX2Q19TAX9MWyy/aNarewfZptechdLn8B3TatB/YXB2j4MKw3jTHKX4AO0CbqaSddMokHUbr0PpSXmFG4O4WIu86asCVihfoM6nUmse5gGkbJOyThVesX4UI0d00LBYMr55VuIZl8MkY1uOiTy9v3c+ShuXj5+NdQdL8B+5gmw8WZuREAAAAASUVORK5CYII=";
        }
        var blobBin = atob(imgString);
        var array = [];
        for (var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        var file = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
        return file;
    };
    return Screenshot;
}());
exports.Screenshot = Screenshot;
},{"./../../Logging/Logging":54}],63:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var HTTP_TIMEOUT = 4000; // timeout in milliseconds
/**
 * Make an http request with retries
 * @param method the http method "GET", "POST" etc
 * @param url the url
 * @param requestBody the request body
 * @param maxRetries the maximum number of retries
 * @param onLoad the onload handler
 */
function makeHttpRequest(method, url, requestBody, maxRetries, onLoad) {
    var makeRequest = function (retries) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.timeout = HTTP_TIMEOUT;
            xhr.onload = function () { onLoad(xhr, resolve, reject); };
            xhr.ontimeout = function () {
                if (retries > 0) {
                    makeRequest(retries - 1).then(resolve, reject);
                }
                else {
                    reject(new Error("Request to '" + url + "' timed out. timeout: " + HTTP_TIMEOUT));
                }
            };
            xhr.onerror = function () {
                if (retries > 0) {
                    makeRequest(retries - 1).then(resolve, reject);
                }
                else {
                    reject(new Error("Request to '" + url + "' errored. " + xhr.status + ": " + xhr.responseText));
                }
            };
            xhr.send(requestBody);
        });
    };
    return makeRequest(maxRetries);
}
var uploadEndpointInt = "https://petrol-int.office.microsoft.com/v1/feedback";
var uploadEndpointProd = "https://petrol.office.microsoft.com/v1/feedback";
/**
 * Send a payload to Petrol
 * @param isProduction is production?
 * @param manifest manifest content
 * @param screenshot screenshot content
 * @param diagnostics diagnostics content
 */
function send(isProduction, manifest, screenshot, diagnostics) {
    if (manifest === undefined) {
        return es6_promise_1.Promise.reject(new Error("Manifest cannot be undefined"));
    }
    var formData = new FormData();
    formData.append("Manifest", manifest);
    if (screenshot) {
        formData.append("Screenshot", screenshot);
    }
    if (diagnostics) {
        formData.append("Diagnostics", diagnostics);
    }
    return makeHttpRequest("POST", isProduction ? uploadEndpointProd : uploadEndpointInt, formData, 2, function (xhr, resolve, reject) {
        if (xhr.status !== 200) {
            reject(new Error("Non-200 response with status code: " + xhr.status + ", response: " + xhr.responseText));
        }
        resolve();
    });
}
exports.send = send;
},{"es6-promise":37}],64:[function(require,module,exports){
"use strict";
/**
 * Feedback.ts
 *
 * Module for payload transport.
 */
exports.__esModule = true;
var Constants = require("./../Constants");
var Utils = require("./../Utils");
var Logging = require("./../Logging/Logging");
var Petrol = require("./Petrol");
var Screenshot_1 = require("./Files/Screenshot");
var Configuration = require("../Configuration/Configuration");
var Manifest_1 = require("./Files/Manifest");
var Transporter = (function () {
    function Transporter(environment, manifestType, appId, type, applicationGroup, telemetryGroup, webGroup) {
        this.manifest = new Manifest_1.Manifest(manifestType, appId, new Date().toISOString(), type, Utils.guid(), applicationGroup, telemetryGroup, webGroup);
        this.environment = environment;
    }
    Transporter.prototype.setComment = function (comment) {
        this.manifest.setComment(comment);
    };
    Transporter.prototype.setEmail = function (email) {
        this.manifest.setEmail(email);
    };
    Transporter.prototype.setCategory = function (category) {
        this.manifest.setCategory(category);
    };
    Transporter.prototype.setScreenshot = function (screenshot) {
        this.screenshot = new Screenshot_1.Screenshot(screenshot);
    };
    /**
     * Set freeform custom values in manifest. Throws if values are already set.
     * @param values the values as a JS object
     */
    Transporter.prototype.setManifestValues = function (values) {
        this.manifest.setValues(values);
    };
    /**
     * Submit the payload
     */
    Transporter.prototype.submit = function () {
        var manifestContent = this.manifest.getContent();
        var screenshotContent = undefined;
        if (this.screenshot) {
            screenshotContent = this.screenshot.getContent();
        }
        return Petrol.send(this.environment === Constants.Environment.Production, manifestContent, screenshotContent)["catch"](function onRejected(err) {
            Configuration.get().getCommonInitOptions().onError("Payload submission failed: " + err.message);
            Logging.getLogger().logEvent(Logging.EventIds.Shared.Upload.Failed.VALUE, { ErrorMessage: err.message });
        });
    };
    return Transporter;
}());
exports.Transporter = Transporter;
},{"../Configuration/Configuration":42,"./../Constants":43,"./../Logging/Logging":54,"./../Utils":84,"./Files/Manifest":61,"./Files/Screenshot":62,"./Petrol":63}],65:[function(require,module,exports){
"use strict";
/**
* UIStrings.ts
*
* Module for the strings to display
*/
exports.__esModule = true;
/**
 * Localized UI strings
 */
var uIStrings;
/**
 * Set UI strings
 * @param {string} data List of localized UI strings
 */
function setUIStrings(data) {
    uIStrings = data;
}
exports.setUIStrings = setUIStrings;
/**
 * Get UI strings
 * @returns the UIStrings
 */
function getUIStrings() {
    return uIStrings;
}
exports.getUIStrings = getUIStrings;
},{}],66:[function(require,module,exports){
"use strict";
/**
 * BellyBand.ts
 *
 * Module for the BellyBand UI
 */
exports.__esModule = true;
var Constants_1 = require("./../../Constants");
var Events = require("./Events");
var Layout = require("./Layout");
var Renderer = require("./../Renderer");
var Utils = require("./../Utils");
var WindowProperties = require("./../../WindowProperties");
var BasicFormTemplate = require("./FormTemplates/BasicFormTemplate");
var UserVoiceFormTemplate = require("./FormTemplates/UserVoiceFormTemplate");
var Configuration = require("./../../Configuration/Configuration");
/**
 * UI initialization for multi, including creating all feedback related HTML elements and setting
 * initial visibility of elements
 */
function createMulti(onClose) {
    // Create the feedbackType -> IFormTemplate mapping
    var formTemplates = {};
    formTemplates[Constants_1.FeedbackType.Smile] = BasicFormTemplate;
    formTemplates[Constants_1.FeedbackType.Frown] = BasicFormTemplate;
    // Show uservoice only if locale is en
    if (Configuration.get().getInAppFeedbackInitOptions().userVoice &&
        Configuration.get().getCommonInitOptions().locale === "en") {
        formTemplates[Constants_1.FeedbackType.Idea] = UserVoiceFormTemplate;
    }
    else {
        formTemplates[Constants_1.FeedbackType.Idea] = BasicFormTemplate;
    }
    if (Configuration.get().getInAppFeedbackInitOptions().bugForm) {
        formTemplates[Constants_1.FeedbackType.Bug] = BasicFormTemplate;
    }
    create(Renderer.elementFromJson(Layout.generateMulti(formTemplates)));
    var useNarrowScreenLayout = WindowProperties.isNarrow();
    Events.registerMulti(formTemplates, useNarrowScreenLayout, function (submitted) {
        Utils.setElementVisibility(Constants_1.IDs.OverlayBackground, false);
        Utils.deleteElementById(Constants_1.IDs.OverlayBackground);
        Configuration.get().getInAppFeedbackInitOptions().onDismiss(submitted);
        onClose();
    });
    // If the screen size is narrow, add the Narrow class to the outermost div so that 
    // the CSS used corresponds to the small screen UI
    if (useNarrowScreenLayout) {
        Utils.addClassById(Constants_1.IDs.OverlayBackground, Constants_1.Classes.NarrowLayout);
    }
}
exports.createMulti = createMulti;
/**
 * UI initialization for single, including creating all feedback related HTML elements and setting
 * initial visibility of elements
 * @return {void}
 */
function createSingle(onClose, feedbackType) {
    create(Renderer.elementFromJson(Layout.generateSingle()));
    Events.registerSingle(feedbackType, function (submitted) {
        Utils.setElementVisibility(Constants_1.IDs.OverlayBackground, false);
        Utils.deleteElementById(Constants_1.IDs.OverlayBackground);
        Configuration.get().getInAppFeedbackInitOptions().onDismiss(submitted);
        onClose();
    });
    Utils.addClassById(Constants_1.IDs.OverlayBackground, Constants_1.Classes.SingleLayout);
}
exports.createSingle = createSingle;
/**
 * Attach the UI element to the DOM.
 * @param userInterface the UI element
 */
function create(userInterface) {
    document.body.insertBefore(userInterface, document.body.firstChild);
    Utils.setElementVisibility(Constants_1.IDs.OverlayBackground, true);
    if (Utils.getInternetExplorerVersion() > 9 || Utils.getInternetExplorerVersion() === -1) {
        // Show the main feedback UI after a certain time to wait for the CSS keyframes animation to finish if 
        // the browser is IE10 and above or non-IE
        setTimeout(onMainContainerRender, 900);
    }
    else {
        onMainContainerRender();
    }
}
/**
 * Code to run when the main container animation has completed.
 */
function onMainContainerRender() {
    // Show the MainContentHolder inside the MainContainer
    Utils.setElementVisibility(Constants_1.IDs.MainContentHolder, true);
    if (document.getElementById(Constants_1.IDs.OverallSmileAnchor)) {
        // Multi feedback
        document.getElementById(Constants_1.IDs.OverallSmileAnchor).focus();
    }
    else if (document.getElementById(Constants_1.IDs.SingleFormComment)) {
        // Single feedback
        document.getElementById(Constants_1.IDs.SingleFormComment).focus();
    }
}
/**
 * UI dismiss. Delete all feedback related HTML elements
 * @return {void}
 */
function dismiss() {
    return;
}
exports.dismiss = dismiss;
},{"./../../Configuration/Configuration":42,"./../../Constants":43,"./../../WindowProperties":86,"./../Renderer":77,"./../Utils":83,"./Events":67,"./FormTemplates/BasicFormTemplate":68,"./FormTemplates/UserVoiceFormTemplate":71,"./Layout":72}],67:[function(require,module,exports){
"use strict";
/**
* Events.ts
*
* A module for all Event handling.
*/
exports.__esModule = true;
var Transport_1 = require("./../../Transport/Transport");
var Configuration = require("./../../Configuration/Configuration");
var Constants_1 = require("./../../Constants");
var Logging = require("./../../Logging/Logging");
var Screenshot = require("./../../Screenshot");
var SpinnerControl_1 = require("./../SpinnerControl");
var UiUtils = require("./../Utils");
var TabFocus = require("./TabFocus");
/**
 * Whether to use narrow layout
 */
var useNarrowLayout = false;
/**
 * Callback for when the feedback dialog is dismissed
 */
var onDismiss;
/**
 * The Selected feedback type, undefined if none selected
 */
var selectedFeedbackType = undefined;
/**
 * feedbackType -> IFormTemplate mapping for multi BellyBand
 */
var formTemplates;
/**
 * Dismiss all, including networking, UI, and events
 * @param submitted Was the control submitted (true), or cancelled (false)?
 */
function dismissAll(submitted) {
    unregister();
    onDismiss(submitted);
}
/**
 * List of listeners and the ids they are attached to. This ensures all events are correctly unregistered.
 */
var listenersList = [];
function addListener(id, event, listener) {
    UiUtils.registerListener(id, event, listener);
    listenersList.push({ event: event, id: id, listener: listener });
}
function removeListeners() {
    for (var _i = 0, listenersList_1 = listenersList; _i < listenersList_1.length; _i++) {
        var listener = listenersList_1[_i];
        UiUtils.unregisterListener(listener.id, listener.event, listener.listener);
    }
    listenersList = [];
}
/**
 * Register events for single belly band
 */
function registerSingle(feedbackType, ON_DISMISS) {
    if (ON_DISMISS === void 0) { ON_DISMISS = function (submitted) { return; }; }
    selectedFeedbackType = feedbackType;
    // SingleFormTemplate events
    addListener(Constants_1.IDs.SingleFormSubmitButton, "click", submitButtonHandlerFactory(Constants_1.IDs.SingleFormSubmitButton, Constants_1.IDs.SingleFormSubmitButtonSpinner, Constants_1.IDs.SingleFormComment, Constants_1.IDs.SingleFormEmailInput, Constants_1.IDs.SingleFormScreenshotCheckbox, Constants_1.IDs.SingleFormCategoriesDropdown));
    registerCommon(ON_DISMISS);
}
exports.registerSingle = registerSingle;
/**
 * Register events for multi belly band
 */
function registerMulti(FORMTEMPLATES, USE_NARROW_LAYOUT, ON_DISMISS) {
    if (ON_DISMISS === void 0) { ON_DISMISS = function (submitted) { return; }; }
    useNarrowLayout = USE_NARROW_LAYOUT;
    formTemplates = FORMTEMPLATES;
    addListener(Constants_1.IDs.OverallSmileAnchor, "click", overallSmileHandler);
    addListener(Constants_1.IDs.OverallFrownAnchor, "click", overallFrownHandler);
    addListener(Constants_1.IDs.OverallIdeaAnchor, "click", overallIdeaHandler);
    addListener(Constants_1.IDs.OverallBugAnchor, "click", overallBugHandler);
    // BasicFormTemplate events
    addListener(Constants_1.IDs.BasicFormSubmitButton, "click", submitButtonHandlerFactory(Constants_1.IDs.BasicFormSubmitButton, Constants_1.IDs.BasicFormSubmitButtonSpinner, Constants_1.IDs.BasicFormComment, Constants_1.IDs.BasicFormEmailInput, Constants_1.IDs.BasicFormScreenshotCheckbox, Constants_1.IDs.BasicFormCategoriesDropdown));
    // UserVoiceFormTemplate events
    addListener(Constants_1.IDs.UserVoiceFormGoButton, "click", UserVoiceFormGoButtonHandler);
    registerCommon(ON_DISMISS);
}
exports.registerMulti = registerMulti;
function registerCommon(ON_DISMISS) {
    onDismiss = ON_DISMISS;
    UiUtils.addEventListenerHelper(window, "keyup", keyEventHandler);
    addListener(Constants_1.IDs.OverlayBackground, "click", overlayBackgroundHandler);
    addListener(Constants_1.IDs.MainContainer, "click", mainContainerHandler);
    addListener(Constants_1.IDs.MainContainer, "keyup", tabKeyEventHandler);
    addListener(Constants_1.IDs.PrivacyStatementLink, "click", privacyStatementLinkHandler);
}
/**
 * Listener un-registration
 */
function unregister() {
    UiUtils.removeEventListenerHelper(window, "keyup", keyEventHandler);
    removeListeners();
}
/**
 * Tab key event handler
 * @param event The Event object
 */
function tabKeyEventHandler(event) {
    var keyCode = event.keyCode || event.which;
    if (keyCode === Constants_1.Keys.Tab) {
        if ((document.activeElement.id === Constants_1.IDs.FirstTabbable && event.shiftKey) ||
            (document.activeElement.id === Constants_1.IDs.LastTabbable && !event.shiftKey)) {
            event.stopPropagation();
            TabFocus.cycleTabFocus(document.activeElement);
        }
    }
}
/**
 * Key event handler
 * @param event The Event object
 */
function keyEventHandler(event) {
    // dismiss feedback upon pressing the escape key
    if (event.keyCode === Constants_1.Keys.Esc) {
        event.preventDefault();
        event.stopPropagation();
        dismissAll(false /*submitted*/);
    }
}
/**
 * Overlay background event handler. Dismiss feedback upon clicking on the background area
 * @param event The Event object
 */
function overlayBackgroundHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    dismissAll(false /*submitted*/);
}
/**
 * Main container event handler. When clicking on main container area, do not propagate the event to lower level.
 * @param event The Event object
 */
function mainContainerHandler(event) {
    event.stopPropagation();
}
/**
 * Privacy statement link handler. When clicking on the privacy statement link,
 * do not propagate the event to lower level.
 * @param event The Event object
 */
function privacyStatementLinkHandler(event) {
    event.stopPropagation();
}
/**
 * Overall button click handler
 * @param event The Event object
 * @param achorId The id of the anchor html element which was selected
 */
function overallHandler(event, anchorId) {
    event.preventDefault();
    event.stopPropagation();
    UiUtils.replaceClassesById(Constants_1.IDs.OverallSmileAnchor, Constants_1.Classes.OverallAnchorActive);
    UiUtils.replaceClassesById(Constants_1.IDs.OverallFrownAnchor, Constants_1.Classes.OverallAnchorActive);
    UiUtils.replaceClassesById(Constants_1.IDs.OverallIdeaAnchor, Constants_1.Classes.OverallAnchorActive);
    UiUtils.replaceClassesById(Constants_1.IDs.OverallBugAnchor, Constants_1.Classes.OverallAnchorActive);
    UiUtils.addClassById(anchorId, Constants_1.Classes.OverallAnchorActive);
    Logging.getLogger().logEvent(Logging.EventIds.InApp.UI.Form.Shown.VALUE, { FeedbackType: selectedFeedbackType });
    var formTemplate = formTemplates[selectedFeedbackType];
    mainContentHolderSlideLeft(formTemplate.containerId);
    formTemplate.onSelect(selectedFeedbackType);
}
/**
 * Smile button event handler
 * @param event The Event object
 */
function overallSmileHandler(event) {
    selectedFeedbackType = Constants_1.FeedbackType.Smile;
    overallHandler(event, Constants_1.IDs.OverallSmileAnchor);
}
/**
 * Frown button event handler
 * @param event The Event object
 */
function overallFrownHandler(event) {
    selectedFeedbackType = Constants_1.FeedbackType.Frown;
    overallHandler(event, Constants_1.IDs.OverallFrownAnchor);
}
/**
 * Idea button event handler
 * @param event The Event object
 */
function overallIdeaHandler(event) {
    selectedFeedbackType = Constants_1.FeedbackType.Idea;
    overallHandler(event, Constants_1.IDs.OverallIdeaAnchor);
}
/**
 * Bug button event handler
 * @param event The Event object
 */
function overallBugHandler(event) {
    selectedFeedbackType = Constants_1.FeedbackType.Bug;
    overallHandler(event, Constants_1.IDs.OverallBugAnchor);
}
/**
 * Main content holder slide left animation
 * @param {string} containerId The id of the container to be made visible
 * @return {void}
 */
function mainContentHolderSlideLeft(containerId) {
    for (var feedbackType in formTemplates) {
        if (formTemplates.hasOwnProperty(feedbackType)) {
            UiUtils.setElementVisibility(formTemplates[feedbackType].containerId, false);
        }
    }
    if (useNarrowLayout) {
        UiUtils.setElementVisibility(Constants_1.IDs.LeftFormContainer, false);
        UiUtils.setElementVisibility(Constants_1.IDs.MiddleFormContainer, true);
        UiUtils.setElementVisibility(containerId, true);
    }
    else {
        UiUtils.addClassById(Constants_1.IDs.ColumnSeparatorDiv, Constants_1.Classes.ShowRightBorder);
        UiUtils.setElementVisibility(Constants_1.IDs.MiddleFormContainer, true);
        UiUtils.setElementVisibility(containerId, true);
        UiUtils.addClassById(Constants_1.IDs.LeftFormContainer, Constants_1.Classes.SlideLeft);
        UiUtils.addClassById(Constants_1.IDs.MiddleFormContainer, Constants_1.Classes.SlideLeft);
    }
}
/**
 * Submit button event handler factory
 * @param event The Event object
 */
function submitButtonHandlerFactory(submitButtonId, spinnerId, commentInputId, emailInputId, screenshotCheckboxId, categoriesDropdownId) {
    return function (event) {
        event.preventDefault();
        event.stopPropagation();
        UiUtils.setElementVisibility(submitButtonId, false);
        var spinner = new SpinnerControl_1.Spinner(spinnerId);
        var transporter = new Transport_1.Transporter(Configuration.get().getCommonInitOptions().environment, "Sas", Configuration.get().getCommonInitOptions().appId, selectedFeedbackType, Configuration.get().getCommonInitOptions().applicationGroup, Configuration.get().getCommonInitOptions().telemetryGroup, Configuration.get().getCommonInitOptions().webGroup);
        var commentElement = document.getElementById(commentInputId);
        var commentEntered = (commentElement && !!commentElement.value);
        if (commentEntered) {
            transporter.setComment(commentElement.value);
        }
        var emailElement = document.getElementById(emailInputId);
        var isEmailIncluded = (emailElement && !!emailElement.value);
        if (isEmailIncluded) {
            transporter.setEmail(emailElement.value);
        }
        var screenshotCheckBox = document.getElementById(screenshotCheckboxId);
        var screenshotCheckBoxSelected = screenshotCheckBox && screenshotCheckBox.checked;
        var categoryElement = document.getElementById(categoriesDropdownId);
        var isCategorySelected = (categoryElement && categoryElement.selectedIndex > 0);
        if (isCategorySelected) {
            transporter.setCategory(categoryElement.value);
        }
        Logging.getLogger().logEvent(Logging.EventIds.InApp.UI.Form.Submit.VALUE, {
            FeedbackType: selectedFeedbackType,
            IsEmailIncluded: isEmailIncluded,
            IsScreenshotIncluded: screenshotCheckBoxSelected
        });
        if (screenshotCheckBoxSelected) {
            var startTime_1 = performance.now();
            Screenshot.createScreenShot().then(function (canvas) {
                var endTime = performance.now();
                Logging.getLogger().logEvent(Logging.EventIds.Shared.Screenshot.Render.Success.VALUE, { TimeMilliseconds: endTime - startTime_1 });
                transporter.setScreenshot(canvas);
                transporter.submit();
            })["catch"](function (error) {
                var endTime = performance.now();
                Logging.getLogger().logEvent(Logging.EventIds.Shared.Screenshot.Render.Failed.VALUE, { ErrorMessage: error, TimeMilliseconds: endTime - startTime_1 });
                transporter.submit();
            });
        }
        else {
            transporter.submit();
        }
        spinner.destroy();
        dismissAll(true /*submitted*/);
    };
}
/**
 * UserVoiceForm Go button event handler
 * Opens UserVoice forum in a new window
 * @param event The Event object
 */
function UserVoiceFormGoButtonHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    window.open(document.getElementById(Constants_1.IDs.UserVoiceFormGoButton).getAttribute(Constants_1.AttributeName.Source));
    dismissAll(false /* submitted */);
}
},{"./../../Configuration/Configuration":42,"./../../Constants":43,"./../../Logging/Logging":54,"./../../Screenshot":59,"./../../Transport/Transport":64,"./../SpinnerControl":78,"./../Utils":83,"./TabFocus":73}],68:[function(require,module,exports){
"use strict";
/**
* BasicFormTemplate.ts
*
* A form template with contact info fields.
*/
exports.__esModule = true;
var UIStrings = require("./../../../UIStrings/UIStrings");
var FormTemplateType_1 = require("./FormTemplateType");
var CategoriesDropdown = require("./../../CategoriesDropdown");
var RatingControl = require("./../../RatingControl");
var Constants = require("./../../../Constants");
var Configuration = require("./../../../Configuration/Configuration");
/**
 * Generate the markup
 * @returns the markup as json
 */
function generate() {
    var categories = Configuration.get().getInAppFeedbackLaunchOptions().categories;
    var formSchema = {
        children: [
            {
                attributes: [{ name: Constants.AttributeName.For, value: Constants.IDs.BasicFormComment }],
                classes: [
                    Constants.Classes.FontSubtitle,
                    Constants.Classes.TextAlignLeft,
                    Constants.Classes.FormQuestionMiddleText,
                ],
                id: Constants.IDs.BasicFormQuestionMiddleText,
                tag: Constants.Tags.Label
            },
            {
                attributes: [{ name: Constants.AttributeName.Id, value: Constants.IDs.BasicFormCategoriesDropdown }],
                brs: categories.show,
                children: CategoriesDropdown.generate(categories ? categories.customCategories : null),
                classes: [Constants.Classes.FontSubText, Constants.Classes.FormCategoriesDropdown, Constants.Classes.TextInput],
                tag: Constants.Tags.Select
            },
            {
                attributes: [
                    {
                        name: Constants.AttributeName.Placeholder,
                        value: UIStrings.getUIStrings().Form.CommentPlaceholder
                    },
                    {
                        name: Constants.AttributeName.MaxLength,
                        value: Constants.AttributeValue.TextAreaMaxLength
                    },
                ],
                classes: [Constants.Classes.FontSubText, Constants.Classes.FormComment, Constants.Classes.TextInput],
                id: Constants.IDs.BasicFormComment,
                tag: Constants.Tags.TextArea
            },
            {
                brs: false,
                children: [
                    {
                        attributes: [{ name: Constants.AttributeName.For, value: Constants.IDs.BasicFormRating }],
                        classes: [Constants.Classes.FontText, Constants.Classes.TextAlignLeft, Constants.Classes.FormRatingLabel],
                        innerText: UIStrings.getUIStrings().Form.RatingLabel,
                        tag: Constants.Tags.Label
                    },
                    RatingControl.generate(Constants.IDs.BasicFormRating),
                ],
                classes: [Constants.Classes.FormRatingContainer]
            },
            {
                attributes: [
                    {
                        name: Constants.AttributeName.Type,
                        value: Constants.AttributeValue.Text
                    },
                    {
                        name: Constants.AttributeName.Placeholder,
                        value: UIStrings.getUIStrings().Form.EmailPlaceholder
                    },
                    {
                        name: Constants.AttributeName.AriaLabel,
                        value: UIStrings.getUIStrings().Form.EmailPlaceholder
                    },
                    {
                        name: Constants.AttributeName.Name,
                        value: Constants.IDs.BasicFormEmailInput
                    },
                    {
                        name: Constants.AttributeName.MaxLength,
                        value: Constants.AttributeValue.TextAreaMaxLength
                    },
                    {
                        name: Constants.AttributeName.Value,
                        value: Configuration.get().getInAppFeedbackInitOptions().userEmail
                            ? Configuration.get().getInAppFeedbackInitOptions().userEmail
                            : ""
                    },
                ],
                classes: [Constants.Classes.FontSubText, Constants.Classes.FormEmailInput, Constants.Classes.TextInput],
                id: Constants.IDs.BasicFormEmailInput,
                tag: Constants.Tags.Input
            },
            {
                children: [
                    {
                        children: [
                            {
                                attributes: [
                                    {
                                        name: Constants.AttributeName.Type,
                                        value: Constants.AttributeValue.Checkbox
                                    },
                                    {
                                        name: Constants.AttributeName.Value,
                                        value: Constants.AttributeValue.Unchecked
                                    },
                                ],
                                brs: Configuration.get().getInAppFeedbackInitOptions().screenshot,
                                classes: [Constants.Classes.FormScreenshotCheckbox, Constants.Classes.CheckBox],
                                id: Constants.IDs.BasicFormScreenshotCheckbox,
                                tag: Constants.Tags.Input
                            },
                            {
                                attributes: [{ name: Constants.AttributeName.For, value: Constants.IDs.BasicFormScreenshotCheckbox }],
                                brs: Configuration.get().getInAppFeedbackInitOptions().screenshot,
                                classes: [Constants.Classes.FontText, Constants.Classes.TextAlignLeft, Constants.Classes.FormScreenshotLabel],
                                innerText: UIStrings.getUIStrings().Form.ScreenshotLabel,
                                tag: Constants.Tags.Label
                            },
                        ],
                        classes: [Constants.Classes.FormScreenshotContainer]
                    },
                    {
                        children: [
                            {
                                classes: [
                                    Constants.Classes.FontSubText,
                                    Constants.Classes.SubmitButton,
                                ],
                                id: Constants.IDs.BasicFormSubmitButton,
                                innerText: UIStrings.getUIStrings().Form.Submit,
                                tag: Constants.Tags.Button
                            },
                            {
                                classes: [Constants.Classes.Spinner, Constants.Classes.Hidden],
                                id: Constants.IDs.BasicFormSubmitButtonSpinner,
                                tag: Constants.Tags.Div
                            },
                        ],
                        classes: [Constants.Classes.FormSubmitButtonContainer]
                    },
                ],
                classes: [Constants.Classes.FormBottomContainer]
            },
        ],
        classes: [Constants.Classes.Hidden, Constants.Classes.MarginLeft60px],
        id: exports.containerId
    };
    return formSchema;
}
exports.generate = generate;
/**
 * The id for the container. This is the id of the top-most element and should
 * be unique to each form
 */
exports.containerId = Constants.IDs.BasicFormContainer;
/**
 * Forms may be used for different feedback types. This method executes form
 * specific logic when the feedback type is selected
 * @param feedbackType feedback type
 */
function onSelect(feedbackType) {
    switch (feedbackType) {
        case Constants.FeedbackType.Smile: {
            document.getElementById(Constants.IDs.BasicFormQuestionMiddleText).textContent =
                UIStrings.getUIStrings().SmileForm.Title;
            break;
        }
        case Constants.FeedbackType.Frown: {
            document.getElementById(Constants.IDs.BasicFormQuestionMiddleText).textContent =
                UIStrings.getUIStrings().FrownForm.Title;
            break;
        }
        case Constants.FeedbackType.Idea: {
            document.getElementById(Constants.IDs.BasicFormQuestionMiddleText).textContent =
                UIStrings.getUIStrings().IdeaForm.Title;
            break;
        }
        case Constants.FeedbackType.Bug: {
            document.getElementById(Constants.IDs.BasicFormQuestionMiddleText).textContent =
                UIStrings.getUIStrings().BugForm.Title;
            break;
        }
        default: {
            break;
        }
    }
    document.getElementById(Constants.IDs.BasicFormComment).focus();
}
exports.onSelect = onSelect;
/**
 * Form template type
 */
exports.type = FormTemplateType_1.FormTemplateType.Basic;
},{"./../../../Configuration/Configuration":42,"./../../../Constants":43,"./../../../UIStrings/UIStrings":65,"./../../CategoriesDropdown":74,"./../../RatingControl":76,"./FormTemplateType":69}],69:[function(require,module,exports){
"use strict";
/**
* FormTemplateType.ts
*
* An enum for the types of forms available.
*/
exports.__esModule = true;
var FormTemplateType;
(function (FormTemplateType) {
    FormTemplateType[FormTemplateType["Single"] = 0] = "Single";
    FormTemplateType[FormTemplateType["Basic"] = 1] = "Basic";
    FormTemplateType[FormTemplateType["UserVoice"] = 2] = "UserVoice";
})(FormTemplateType = exports.FormTemplateType || (exports.FormTemplateType = {}));
},{}],70:[function(require,module,exports){
"use strict";
/**
* SingleFormTemplate.ts
*
* A form template with contact info fields.
*/
exports.__esModule = true;
var UIStrings = require("./../../../UIStrings/UIStrings");
var FormTemplateType_1 = require("./FormTemplateType");
var CategoriesDropdown = require("./../../CategoriesDropdown");
var RatingControl = require("./../../RatingControl");
var Configuration = require("./../../../Configuration/Configuration");
var Constants = require("./../../../Constants");
/**
 * Generate the markup
 * @returns the markup as json
 */
function generate() {
    var categories = Configuration.get().getInAppFeedbackLaunchOptions().categories;
    var formSchema = {
        children: [
            {
                attributes: [{ name: Constants.AttributeName.For, value: Constants.IDs.SingleFormComment }],
                classes: [
                    Constants.Classes.FontSubtitle,
                    Constants.Classes.TextAlignLeft,
                    Constants.Classes.FormQuestionMiddleText,
                ],
                id: Constants.IDs.SingleFormQuestionMiddleText,
                innerText: UIStrings.getUIStrings().SingleForm.Title,
                tag: Constants.Tags.Label
            },
            {
                attributes: [{ name: Constants.AttributeName.Id, value: Constants.IDs.SingleFormCategoriesDropdown }],
                brs: categories.show,
                children: CategoriesDropdown.generate(categories ? categories.customCategories : null),
                classes: [Constants.Classes.FontSubText, Constants.Classes.FormCategoriesDropdown, Constants.Classes.TextInput],
                tag: Constants.Tags.Select
            },
            {
                attributes: [
                    {
                        name: Constants.AttributeName.Placeholder,
                        value: UIStrings.getUIStrings().Form.CommentPlaceholder
                    },
                    {
                        name: Constants.AttributeName.MaxLength,
                        value: Constants.AttributeValue.TextAreaMaxLength
                    },
                ],
                classes: [Constants.Classes.FontSubText, Constants.Classes.FormComment, Constants.Classes.TextInput],
                id: Constants.IDs.SingleFormComment,
                tag: Constants.Tags.TextArea
            },
            {
                brs: false,
                children: [
                    {
                        attributes: [{ name: Constants.AttributeName.For, value: Constants.IDs.SingleFormRating }],
                        classes: [
                            Constants.Classes.FontSubText,
                            Constants.Classes.TextAlignLeft,
                            Constants.Classes.FormRatingLabel,
                        ],
                        innerText: UIStrings.getUIStrings().Form.RatingLabel,
                        tag: Constants.Tags.Label
                    },
                    RatingControl.generate(Constants.IDs.SingleFormRating),
                ],
                classes: [Constants.Classes.FormRatingContainer]
            },
            {
                attributes: [
                    {
                        name: Constants.AttributeName.Type,
                        value: Constants.AttributeValue.Text
                    },
                    {
                        name: Constants.AttributeName.Placeholder,
                        value: UIStrings.getUIStrings().Form.EmailPlaceholder
                    },
                    {
                        name: Constants.AttributeName.AriaLabel,
                        value: UIStrings.getUIStrings().Form.EmailPlaceholder
                    },
                    {
                        name: Constants.AttributeName.Name,
                        value: Constants.IDs.SingleFormEmailInput
                    },
                    {
                        name: Constants.AttributeName.MaxLength,
                        value: Constants.AttributeValue.TextAreaMaxLength
                    },
                    {
                        name: Constants.AttributeName.Value,
                        value: Configuration.get().getInAppFeedbackInitOptions().userEmail
                            ? Configuration.get().getInAppFeedbackInitOptions().userEmail
                            : ""
                    },
                ],
                classes: [Constants.Classes.FontSubText, Constants.Classes.FormEmailInput, Constants.Classes.TextInput],
                id: Constants.IDs.SingleFormEmailInput,
                tag: Constants.Tags.Input
            },
            {
                children: [
                    {
                        attributes: [
                            {
                                name: Constants.AttributeName.HRef,
                                value: Constants.Urls.PrivacyStatementLink
                            },
                            {
                                name: Constants.AttributeName.Target,
                                value: Constants.AttributeValue.BlankWindow
                            },
                            {
                                name: Constants.AttributeName.Rel,
                                value: Constants.AttributeValue.NoReferrer
                            },
                        ],
                        classes: [Constants.Classes.Link],
                        id: Constants.IDs.PrivacyStatementLink,
                        innerText: UIStrings.getUIStrings().PrivacyStatement,
                        tag: Constants.Tags.Anchor
                    },
                ],
                classes: [Constants.Classes.FontSubSubText, Constants.Classes.TextAlignLeft,
                    Constants.Classes.PrivacyStatementLinkDiv]
            },
            {
                children: [
                    {
                        children: [
                            {
                                attributes: [
                                    {
                                        name: Constants.AttributeName.Type,
                                        value: Constants.AttributeValue.Checkbox
                                    },
                                    {
                                        name: Constants.AttributeName.Value,
                                        value: Constants.AttributeValue.Unchecked
                                    },
                                ],
                                brs: Configuration.get().getInAppFeedbackInitOptions().screenshot,
                                classes: [Constants.Classes.FormScreenshotCheckbox, Constants.Classes.CheckBox],
                                id: Constants.IDs.SingleFormScreenshotCheckbox,
                                tag: Constants.Tags.Input
                            },
                            {
                                attributes: [{ name: Constants.AttributeName.For, value: Constants.IDs.SingleFormScreenshotCheckbox }],
                                brs: Configuration.get().getInAppFeedbackInitOptions().screenshot,
                                classes: [Constants.Classes.FontText, Constants.Classes.TextAlignLeft, Constants.Classes.FormScreenshotLabel],
                                innerText: UIStrings.getUIStrings().Form.ScreenshotLabel,
                                tag: Constants.Tags.Label
                            },
                        ],
                        classes: [Constants.Classes.FormScreenshotContainer]
                    },
                    {
                        children: [
                            {
                                classes: [
                                    Constants.Classes.FontSubText,
                                    Constants.Classes.SubmitButton,
                                ],
                                id: Constants.IDs.SingleFormSubmitButton,
                                innerText: UIStrings.getUIStrings().Form.Submit,
                                tag: Constants.Tags.Button
                            },
                            {
                                classes: [Constants.Classes.Spinner, Constants.Classes.Hidden],
                                id: Constants.IDs.SingleFormSubmitButtonSpinner,
                                tag: Constants.Tags.Div
                            },
                        ],
                        classes: [Constants.Classes.FormSubmitButtonContainer]
                    },
                ],
                classes: [Constants.Classes.FormBottomContainer]
            },
        ],
        id: exports.containerId
    };
    return formSchema;
}
exports.generate = generate;
/**
 * The id for the container. This is the id of the top-most element and should
 * be unique to each form
 */
exports.containerId = Constants.IDs.SingleFormContainer;
/**
 * Forms may be used for different feedback types. This method executes form
 * specific logic when the feedback type is selected
 * @param feedbackType feedback type
 */
function onSelect(feedbackType) {
    document.getElementById(Constants.IDs.SingleFormComment).focus();
}
exports.onSelect = onSelect;
/**
 * Form template type
 */
exports.type = FormTemplateType_1.FormTemplateType.Single;
},{"./../../../Configuration/Configuration":42,"./../../../Constants":43,"./../../../UIStrings/UIStrings":65,"./../../CategoriesDropdown":74,"./../../RatingControl":76,"./FormTemplateType":69}],71:[function(require,module,exports){
"use strict";
/**
* UserVoiceFormTemplate
*
* A form template for directing to user voice.
*/
exports.__esModule = true;
var UIStrings = require("./../../../UIStrings/UIStrings");
var FormTemplateType_1 = require("./FormTemplateType");
var Constants = require("./../../../Constants");
var Configuration = require("./../../../Configuration/Configuration");
/**
 * Generate the markup
 * @returns the markup as json
 */
function generate() {
    var initOptions = Configuration.get().getInAppFeedbackInitOptions().userVoice;
    var formSchema = {
        children: [
            {
                classes: [Constants.Classes.FontSubtitle, Constants.Classes.TextAlignLeft,
                    Constants.Classes.FormQuestionMiddleText],
                innerText: UIStrings.getUIStrings().UserVoiceForm.Title
            },
            {
                classes: [Constants.Classes.FontText, Constants.Classes.TextAlignLeft,
                    Constants.Classes.FormMiddleText],
                innerText: UIStrings.getUIStrings().UserVoiceForm.Text
            },
            {
                children: [
                    {
                        children: [
                            {
                                attributes: [
                                    {
                                        name: Constants.AttributeName.Source,
                                        value: initOptions.url
                                    },
                                ],
                                classes: [
                                    Constants.Classes.SubmitButton,
                                    Constants.Classes.FontSubText,
                                ],
                                id: Constants.IDs.UserVoiceFormGoButton,
                                innerText: UIStrings.getUIStrings().UserVoiceForm.Button,
                                tag: Constants.Tags.Button
                            },
                        ],
                        classes: [Constants.Classes.FormSubmitButtonContainer]
                    },
                ],
                classes: [Constants.Classes.FormBottomContainer]
            },
        ],
        classes: [Constants.Classes.Hidden, Constants.Classes.MarginLeft60px],
        id: exports.containerId
    };
    return formSchema;
}
exports.generate = generate;
/**
 * The id for the container. This is the id of the top-most element and should
 * be unique to each form
 */
exports.containerId = Constants.IDs.UserVoiceFormContainer;
/**
 * Forms may be used for different feedback types. This method executes form
 * specific logic when the feedback type is selected
 * @param feedbackType feedback type
 */
function onSelect(feedbackType) {
    document.getElementById(Constants.IDs.UserVoiceFormGoButton).focus();
}
exports.onSelect = onSelect;
/**
 * Form template type
 */
exports.type = FormTemplateType_1.FormTemplateType.UserVoice;
},{"./../../../Configuration/Configuration":42,"./../../../Constants":43,"./../../../UIStrings/UIStrings":65,"./FormTemplateType":69}],72:[function(require,module,exports){
"use strict";
/**
* Layout.ts
*
* Module for the layout
*/
exports.__esModule = true;
var Constants_1 = require("./../../Constants");
var UIStrings = require("./../../UIStrings/UIStrings");
var Utils = require("./../Utils");
var SingleFormTemplate = require("./FormTemplates/SingleFormTemplate");
/**
 * Generates the multi layout as a Renderer.IUIAsJson object
 *
 * The TabFocus.ts has a dependency in the mainContainer. All tabbable elements
 * should be placed inside the mainContainer otherwise TabFocus.ts will not
 * function as expected.
 * @param {[key: number]: IFormTemplate} formTemplates FeedbackType -> FormTemplate mapping
 * @returns {Renderer.IUIAsJson} Renderer.IUIAsJson object
 */
function generateMulti(formTemplates) {
    var schema = {
        attributes: [{ name: Constants_1.AttributeName.DataHtml2CanvasIgnore, value: Constants_1.AttributeValue.True }],
        children: [
            {
                attributes: [
                    { name: Constants_1.AttributeName.Role, value: "dialog" },
                    { name: "aria-modal", value: "true" },
                    { name: "aria-describedby", value: Constants_1.IDs.QuestionLeftText },
                ],
                children: [
                    {
                        // This adds a "first" dummy tabbable div to the mainContainer. It's used as a marker
                        // to handle tabs and shift tabs so focus will stay with elements on just the feedback
                        // dialog. Do not relocate this without updating the TabFocus.ts code.
                        attributes: [{ name: Constants_1.AttributeName.TabIndex, value: Constants_1.AttributeValue.Zero }],
                        id: Constants_1.IDs.FirstTabbable
                    },
                    {
                        children: [
                            {
                                children: [
                                    {
                                        classes: [Constants_1.Classes.FontSubtitle, Constants_1.Classes.TextAlignLeft],
                                        id: Constants_1.IDs.QuestionLeftText,
                                        innerText: UIStrings.getUIStrings().FeedbackSubtitle
                                    },
                                    {
                                        children: [
                                            {
                                                children: generateOverallAnchors(formTemplates),
                                                id: Constants_1.IDs.OverallAnchorsContainer
                                            },
                                        ],
                                        id: Constants_1.IDs.ColumnSeparatorDiv
                                    },
                                    {
                                        children: [
                                            {
                                                attributes: [
                                                    {
                                                        name: Constants_1.AttributeName.HRef,
                                                        value: Constants_1.Urls.PrivacyStatementLink
                                                    },
                                                    {
                                                        name: Constants_1.AttributeName.Target,
                                                        value: Constants_1.AttributeValue.BlankWindow
                                                    },
                                                    {
                                                        name: Constants_1.AttributeName.Rel,
                                                        value: Constants_1.AttributeValue.NoReferrer
                                                    },
                                                ],
                                                classes: [Constants_1.Classes.Link],
                                                id: Constants_1.IDs.PrivacyStatementLink,
                                                innerText: UIStrings.getUIStrings().PrivacyStatement,
                                                tag: Constants_1.Tags.Anchor
                                            },
                                        ],
                                        classes: [Constants_1.Classes.FontSubSubText, Constants_1.Classes.TextAlignLeft, Constants_1.Classes.PrivacyStatementLinkDiv]
                                    },
                                ],
                                classes: [Constants_1.Classes.FormContainer],
                                id: Constants_1.IDs.LeftFormContainer
                            },
                            {
                                children: generateMultiForms(formTemplates),
                                classes: [Constants_1.Classes.FormContainer, Constants_1.Classes.Hidden],
                                id: Constants_1.IDs.MiddleFormContainer
                            },
                        ],
                        classes: [Constants_1.Classes.Hidden],
                        id: Constants_1.IDs.MainContentHolder,
                        tag: Constants_1.Tags.Form
                    },
                    {
                        // This adds a "last" dummy tabbable div to the mainContainer. It's used as a marker
                        // to handle tabs and shift tabs so focus will stay with elements on just the feedback
                        // dialog. Do not relocate this without updating the TabFocus.ts code.
                        attributes: [{ name: Constants_1.AttributeName.TabIndex, value: Constants_1.AttributeValue.Zero }],
                        id: Constants_1.IDs.LastTabbable
                    },
                ],
                id: Constants_1.IDs.MainContainer
            },
        ],
        classes: [Utils.isRightToLeft() ? Constants_1.Classes.Rtl : ""],
        id: Constants_1.IDs.OverlayBackground
    };
    return schema;
}
exports.generateMulti = generateMulti;
/**
 * Generates the single layout as a Renderer.IUIAsJson object
 *
 * The TabFocus.ts has a dependency in the mainContainer. All tabbable elements
 * should be placed inside the mainContainer otherwise TabFocus.ts will not
 * function as expected.
 * @returns {Renderer.IUIAsJson} Renderer.IUIAsJson object
 */
function generateSingle() {
    var schema = {
        attributes: [{ name: Constants_1.AttributeName.DataHtml2CanvasIgnore, value: Constants_1.AttributeValue.True }],
        children: [
            {
                children: [
                    {
                        // This adds a "first" dummy tabbable div to the mainContainer. It's used as a marker
                        // to handle tabs and shift tabs so focus will stay with elements on just the feedback
                        // dialog. Do not relocate this without updating the TabFocus.ts code.
                        attributes: [{ name: Constants_1.AttributeName.TabIndex, value: Constants_1.AttributeValue.Zero }],
                        id: Constants_1.IDs.FirstTabbable
                    },
                    {
                        children: [
                            {
                                children: [SingleFormTemplate.generate()],
                                classes: [Constants_1.Classes.FormContainer],
                                id: Constants_1.IDs.MiddleFormContainer
                            },
                        ],
                        classes: [Constants_1.Classes.Hidden],
                        id: Constants_1.IDs.MainContentHolder,
                        tag: Constants_1.Tags.Form
                    },
                    {
                        // This adds a "last" dummy tabbable div to the mainContainer. It's used as a marker
                        // to handle tabs and shift tabs so focus will stay with elements on just the feedback
                        // dialog. Do not relocate this without updating the TabFocus.ts code.
                        attributes: [{ name: Constants_1.AttributeName.TabIndex, value: Constants_1.AttributeValue.Zero }],
                        id: Constants_1.IDs.LastTabbable
                    },
                ],
                id: Constants_1.IDs.MainContainer
            },
        ],
        classes: [Constants_1.Classes.SingleLayout, Utils.isRightToLeft() ? Constants_1.Classes.Rtl : ""],
        id: Constants_1.IDs.OverlayBackground
    };
    return schema;
}
exports.generateSingle = generateSingle;
/**
 * Generate Renderer.IUIAsJson objects that holds the different forms that will be used on the bellyband.
 * This is used to generate just one form of each one of the templates that are actually going to be used.
 * @param {[key: number]: IFormTemplate} formTemplates FeedbackType -> FormTemplate mapping
 * @returns {Renderer.IUIAsJson} Renderer.IUIAsJson object
 */
function generateMultiForms(formTemplates) {
    var wrapper = {
        children: []
    };
    var pushedContainers = {};
    for (var feedbackType in formTemplates) {
        if (formTemplates.hasOwnProperty(feedbackType)) {
            var notExists = !(formTemplates[feedbackType].containerId in pushedContainers);
            if (notExists) {
                wrapper.children.push(formTemplates[feedbackType].generate());
                pushedContainers[formTemplates[feedbackType].containerId] = true;
            }
        }
    }
    return wrapper.children;
}
/**
 * Generates Renderer.IUIAsJson object that holds the different anchors that will be used on the bellyband.
 * @param {[key: number]: IFormTemplate} formTemplates FeedbackType -> FormTemplate mapping
 * @returns {Renderer.IUIAsJson} Renderer.IUIAsJson object
 */
function generateOverallAnchors(formTemplates) {
    var wrapper = {
        children: []
    };
    if (Constants_1.FeedbackType.Smile in formTemplates) {
        wrapper.children.push(generateOverallAnchor(Constants_1.IDs.OverallSmileAnchor, Constants_1.IDs.OverallSmileImage, 
        // The svg code for the image
        // tslint:disable-next-line:max-line-length
        '<svg viewBox="0 0 72 72" width="24px" height="24px" focusable="false"><path d="M36 1C16.7 1 1 16.7 1 36s15.7 35 35 35c19.3 0 35-15.7 35-35S55.3 1 36 1ZM49.3 18.3c2.3 0 4.2 2.7 4.2 6 0 3.3-1.9 6-4.2 6 -2.3 0-4.2-2.7-4.2-6C45.1 21 47 18.3 49.3 18.3ZM22.9 18.3c2.3 0 4.2 2.7 4.2 6 0 3.3-1.9 6-4.2 6 -2.3 0-4.2-2.7-4.2-6C18.7 21 20.6 18.3 22.9 18.3ZM36 58.6c-8.5 0-16-4.1-20.9-10.4l3.5-3.6c3.5 4.5 9.9 7.6 17.4 7.6 7.4 0 13.9-3.1 17.4-7.6l3.6 3.6C52.1 54.4 44.4 58.6 36 58.6Z"/></svg>', Constants_1.IDs.OverallSmileText, UIStrings.getUIStrings().SmileForm.Anchor));
    }
    if (Constants_1.FeedbackType.Frown in formTemplates) {
        wrapper.children.push(generateOverallAnchor(Constants_1.IDs.OverallFrownAnchor, Constants_1.IDs.OverallFrownImage, 
        // The svg code for the image
        // tslint:disable-next-line:max-line-length
        '<svg viewBox="0 0 72 72" width="24px" height="24px" focusable="false"><path d="M36 1C16.7 1 1 16.7 1 36s15.7 35 35 35c19.3 0 35-15.7 35-35S55.3 1 36 1ZM49.3 18.3c2.3 0 4.2 2.7 4.2 6 0 3.3-1.9 6-4.2 6 -2.3 0-4.2-2.7-4.2-6C45.1 21 47 18.3 49.3 18.3ZM22.9 18.3c2.3 0 4.2 2.7 4.2 6 0 3.3-1.9 6-4.2 6 -2.3 0-4.2-2.7-4.2-6C18.7 21 20.6 18.3 22.9 18.3ZM52.8 57.9c-3.3-4.4-9.6-7.3-16.7-7.3 -7.2 0-13.4 3-16.7 7.3l-3.4-3.4c4.7-6.1 11.9-10 20.1-10 8.2 0 15.5 4 20.2 10L52.8 57.9Z"/></svg>', Constants_1.IDs.OverallFrownText, UIStrings.getUIStrings().FrownForm.Anchor));
    }
    if (Constants_1.FeedbackType.Idea in formTemplates) {
        wrapper.children.push(generateOverallAnchor(Constants_1.IDs.OverallIdeaAnchor, Constants_1.IDs.OverallIdeaImage, 
        // The svg code for the image
        // tslint:disable-next-line:max-line-length
        '<svg viewBox="0 0 72 72" width="24px" height="24px" focusable="false"><path d="M42.3 62H29.2c-1.1 0-2 0.9-2 2s1.9 2 3 2h11.1c1.1 0 3-0.9 3-2S43.4 62 42.3 62ZM36 1.1C25 1.1 14.8 7 14.8 20.6c0 2.2 0.8 4.4 0.7 4.1 1.2 2.9 2.7 5.6 6.3 10.9 4.2 6.3 4.7 7.6 4.8 11.1v1.3c0 1.3 1 3 2.7 3h13.5c1.7 0 2.8-1.7 2.8-3v-1.5c0.1-3.5 0.1-4.7 4.2-10.9 3.6-5.4 5.7-8.4 6.8-11 0 0 0.6-1.6 0.6-4.1C57.2 6.9 47 1.1 36 1.1ZM31.9 11.9c-3.2 0-5.6 4.2-5.5 6.2 0.2 4-4.4 3.8-4.4 0.6 0-5.3 2.8-10.3 8.5-10.9C34.6 7.3 34.6 11.9 31.9 11.9ZM43.6 55h-15c-1.1 0-2 0.9-2 2v1c0 1.1 0.9 2 2 2h15c1.1 0 2-0.9 2-2v-1C45.6 55.9 44.7 55 43.6 55ZM39.1 68h-6c-0.8 0-1.5 0.7-1.5 1.5s1.2 1.5 2 1.5h5c0.8 0 2-0.7 2-1.5S39.9 68 39.1 68Z"/></svg>', Constants_1.IDs.OverallIdeaText, UIStrings.getUIStrings().IdeaForm.Anchor));
    }
    if (Constants_1.FeedbackType.Bug in formTemplates) {
        wrapper.children.push(generateOverallAnchor(Constants_1.IDs.OverallBugAnchor, Constants_1.IDs.OverallBugImage, 
        // The svg code for the image
        // tslint:disable-next-line:max-line-length
        '<svg viewBox="150 100 1748 1748" width="24px" height="24px" focusable="false"><path d="M1824 1088q0 26-19 45t-45 19h-224q0 171-67 290l208 209q19 19 19 45t-19 45q-18 19-45 19t-45-19l-198-197q-5 5-15 13t-42 28.5-65 36.5-82 29-97 13v-896h-128v896q-51 0-101.5-13.5t-87-33-66-39-43.5-32.5l-15-14-183 207q-20 21-48 21-24 0-43-16-19-18-20.5-44.5t15.5-46.5l202-227q-58-114-58-274h-224q-26 0-45-19t-19-45 19-45 45-19h224v-294l-173-173q-19-19-19-45t19-45 45-19 45 19l173 173h844l173-173q19-19 45-19t45 19 19 45-19 45l-173 173v294h224q26 0 45 19t19 45zm-480-576h-640q0-133 93.5-226.5t226.5-93.5 226.5 93.5 93.5 226.5z"/></svg>', Constants_1.IDs.OverallBugText, UIStrings.getUIStrings().BugForm.Anchor));
    }
    return wrapper.children;
}
/**
 * Generates a Renderer.IUIAsJson object that holds an anchor that will be used on the bellyband.
 * @param overallAnchorID the overall anchor id
 * @param overallImageID the image id
 * @param imageClass the image class (icon)
 * @param overallTextID the id for text box
 * @param uiString the string to display
 */
function generateOverallAnchor(overallAnchorID, overallImageID, svgImage, overallTextID, uiString) {
    return {
        attributes: [
            { name: Constants_1.AttributeName.Type, value: Constants_1.AttributeValue.Button },
        ],
        children: [
            {
                classes: [Constants_1.Classes.OverallImage],
                id: overallImageID,
                innerHTML: svgImage,
                tag: Constants_1.Tags.Div
            },
            {
                classes: [Constants_1.Classes.FontSubtitle, Constants_1.Classes.OverallText],
                id: overallTextID,
                innerText: uiString
            },
        ],
        classes: [Constants_1.Classes.OverallAnchor, Constants_1.Classes.TextAlignLeft],
        id: overallAnchorID,
        tag: Constants_1.Tags.Button
    };
}
},{"./../../Constants":43,"./../../UIStrings/UIStrings":65,"./../Utils":83,"./FormTemplates/SingleFormTemplate":70}],73:[function(require,module,exports){
"use strict";
/**
* TabFocus.ts
*
* Module to handle tab and shift tab focus
*/
exports.__esModule = true;
var Constants_1 = require("./../../Constants");
/**
 * Keeps tabs and shift tabs focus on visible elements of the feedback dialog
 * This prevents tabs and shift tabs cycle focus to elements of the background main page.
 * @param focusedElement The in-focus element object
 */
function cycleTabFocus(focusedElement) {
    var elements = getTabbableElements();
    // when a tab lands on the last dummy tabbable element, set focus to the first
    // visible element which is the one after the first dummy tabbable element
    if (focusedElement.id === Constants_1.IDs.LastTabbable) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.id === Constants_1.IDs.FirstTabbable || !checkVisible(element)) {
                continue;
            }
            element.focus();
            return;
        }
        // when a shift tab lands on the first dummy tabbable element, set focus to the last
        // visible element which is the one before the last dummy tabbable element
    }
    else if (focusedElement.id === Constants_1.IDs.FirstTabbable) {
        for (var i = elements.length - 1; i >= 0; i--) {
            var element = elements[i];
            if (element.id === Constants_1.IDs.LastTabbable || !checkVisible(element)) {
                continue;
            }
            element.focus();
            return;
        }
    }
}
exports.cycleTabFocus = cycleTabFocus;
/**
 * Returns a list of tabbable elements.
 * @returns {NodeListOf<Element>} list of tabbable elements
 */
function getTabbableElements() {
    var tabbableSelector = "a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']), " +
        "button:not([disabled]):not([tabindex=\'-1\']), select:not([disabled]):not([tabindex=\'-1\']), " +
        "textarea:not([disabled]):not([tabindex =\'-1\']), " +
        "object, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]";
    return document.getElementById(Constants_1.IDs.MainContainer).querySelectorAll(tabbableSelector);
}
/**
 * Returns visibility of an element by inspecting the element's parent class name for visible/hidden value.
 * Walk up the parent chain if needed.
 * @param element The element object
 * @returns {Boolean} whether the element is visible
 */
function checkVisible(element) {
    if (!element.parentElement) {
        return false;
    }
    // don't bother if parent element id is just whitespace or empty
    if (/\S/.test(element.parentElement.id)) {
        if (element.parentElement.className.indexOf(Constants_1.Classes.Visible) >= 0) {
            return true;
        }
        if (element.parentElement.className.indexOf(Constants_1.Classes.Hidden) >= 0) {
            return false;
        }
    }
    return checkVisible(element.parentElement);
}
},{"./../../Constants":43}],74:[function(require,module,exports){
"use strict";
/**
* CategoriesDropdown.ts
*
* A module to render the categories dropdown
*/
exports.__esModule = true;
var UIStrings = require("./../UIStrings/UIStrings");
var Constants = require("./../Constants");
/**
 * Generate custom categories drop-down list. The list will contain just the
 * placeholder string if customCategories contains no value.
 * @param customCategories category values
 */
function generate(customCategories) {
    var categories = customCategories ? customCategories : [];
    var result = [{
            attributes: [{ name: "selected", value: "true" }],
            innerText: UIStrings.getUIStrings().Form.CategoryPlaceholder,
            tag: Constants.Tags.Option
        }];
    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
        var category = categories_1[_i];
        result.push({
            innerText: category,
            tag: Constants.Tags.Option
        });
    }
    return result;
}
exports.generate = generate;
},{"./../Constants":43,"./../UIStrings/UIStrings":65}],75:[function(require,module,exports){
"use strict";
/**
 * ChoiceGroupControl.ts
 *
 * A module for rendering a choice group.
 */
exports.__esModule = true;
var Constants = require("./../Constants");
function generateRadioGroup(id, question, choices) {
    var fieldSet = {
        children: [
            {
                classes: [Constants.Classes.FontSubText],
                innerText: question,
                tag: Constants.Tags.Legend
            },
        ],
        tag: Constants.Tags.FieldSet
    };
    for (var _i = 0, choices_1 = choices; _i < choices_1.length; _i++) {
        var choice = choices_1[_i];
        Array.prototype.push.apply(fieldSet.children, generateRadioButton(choice[0].toString(), choice[1], id));
    }
    return {
        children: [fieldSet],
        classes: [Constants.Classes.ChoiceGroup],
        id: id
    };
}
exports.generateRadioGroup = generateRadioGroup;
function generateRadioButton(value, label, id) {
    return [
        {
            attributes: [
                { name: Constants.AttributeName.Type, value: Constants.AttributeValue.Radio },
                { name: Constants.AttributeName.Value, value: value },
                { name: Constants.AttributeName.Name, value: id },
            ],
            id: value,
            tag: Constants.Tags.Input
        },
        {
            attributes: [{ name: Constants.AttributeName.For, value: value }],
            children: [
                {
                    children: [{ tag: Constants.Tags.Span }],
                    classes: [Constants.Classes.ChoiceGroupIcon],
                    tag: Constants.Tags.Span
                },
                {
                    classes: ["obf-ChoiceGroupLabel"],
                    innerHTML: label,
                    tag: Constants.Tags.Span
                },
            ],
            classes: [Constants.Classes.FontSubText],
            tag: Constants.Tags.Label
        },
    ];
}
},{"./../Constants":43}],76:[function(require,module,exports){
"use strict";
/**
* RatingControl.ts
*
* A module for a rating control.
*/
exports.__esModule = true;
var Constants = require("./../Constants");
var starId = "obf-star";
var starDefinition = {
    children: [
        {
            attributes: [
                { name: Constants.AttributeName.Id, value: starId },
                { name: Constants.AttributeName.X, value: "0" },
                { name: Constants.AttributeName.Y, value: "0" },
                { name: Constants.AttributeName.Width, value: "105" },
                { name: Constants.AttributeName.Height, value: "100" },
                {
                    name: Constants.AttributeName.Points,
                    value: "52.5, 80.3 84, 100 76.3, 63 105, 38 67.2, 35 52.5, 0 37.8, 35 0, 38 28.7, 63 20, 100 52.5, 80.3"
                },
            ],
            id: starId,
            tag: Constants.Tags.Polygon
        },
    ],
    tag: Constants.Tags.Defs
};
var firstStar = {
    attributes: [{ name: Constants.AttributeName.xlinkHref, value: "#" + starId }],
    tag: Constants.Tags.Use
};
var secondStar = {
    attributes: [
        { name: Constants.AttributeName.xlinkHref, value: "#" + starId },
        { name: Constants.AttributeName.Transform, value: "translate(105 0)" },
    ],
    tag: Constants.Tags.Use
};
var thirdStar = {
    attributes: [
        { name: Constants.AttributeName.xlinkHref, value: "#" + starId },
        { name: Constants.AttributeName.Transform, value: "translate(210 0)" },
    ],
    tag: Constants.Tags.Use
};
var fourthStar = {
    attributes: [
        { name: Constants.AttributeName.xlinkHref, value: "#" + starId },
        { name: Constants.AttributeName.Transform, value: "translate(315 0)" },
    ],
    tag: Constants.Tags.Use
};
var fifthStar = {
    attributes: [
        { name: Constants.AttributeName.xlinkHref, value: "#" + starId },
        { name: Constants.AttributeName.Transform, value: "translate(420 0)" },
    ],
    tag: Constants.Tags.Use
};
var emptyStars = {
    attributes: [{ name: Constants.AttributeName.ViewBox, value: "0 0 525 100" }],
    children: [starDefinition, firstStar, secondStar, thirdStar, fourthStar, fifthStar],
    classes: [Constants.Classes.RatingGraphic],
    tag: Constants.Tags.Svg
};
var oneFilledStar = {
    attributes: [{ name: Constants.AttributeName.ViewBox, value: "0 0 105 100" }],
    children: [starDefinition, firstStar],
    classes: [Constants.Classes.RatingGraphic, Constants.Classes.RatingGraphicFilled],
    tag: Constants.Tags.Svg
};
var twoFilledStar = {
    attributes: [{ name: Constants.AttributeName.ViewBox, value: "0 0 210 100" }],
    children: [starDefinition, firstStar, secondStar],
    classes: [Constants.Classes.RatingGraphic, Constants.Classes.RatingGraphicFilled],
    tag: Constants.Tags.Svg
};
var threeFilledStar = {
    attributes: [{ name: Constants.AttributeName.ViewBox, value: "0 0 315 100" }],
    children: [starDefinition, firstStar, secondStar, thirdStar],
    classes: [Constants.Classes.RatingGraphic, Constants.Classes.RatingGraphicFilled],
    tag: Constants.Tags.Svg
};
var fourFilledStar = {
    attributes: [{ name: Constants.AttributeName.ViewBox, value: "0 0 420 100" }],
    children: [starDefinition, firstStar, secondStar, thirdStar, fourthStar],
    classes: [Constants.Classes.RatingGraphic, Constants.Classes.RatingGraphicFilled],
    tag: Constants.Tags.Svg
};
var fiveFilledStar = {
    attributes: [{ name: Constants.AttributeName.ViewBox, value: "0 0 525 100" }],
    children: [starDefinition, firstStar, secondStar, thirdStar, fourthStar, fifthStar],
    classes: [Constants.Classes.RatingGraphic, Constants.Classes.RatingGraphicFilled],
    tag: Constants.Tags.Svg
};
function generate(id) {
    return {
        children: [
            emptyStars,
            {
                attributes: [
                    { name: Constants.AttributeName.Type, value: "radio" },
                    { name: Constants.AttributeName.Name, value: id },
                    { name: Constants.AttributeName.Value, value: "1" },
                ],
                tag: Constants.Tags.Input
            },
            oneFilledStar,
            {
                attributes: [
                    { name: Constants.AttributeName.Type, value: "radio" },
                    { name: Constants.AttributeName.Name, value: id },
                    { name: Constants.AttributeName.Value, value: "2" },
                ],
                tag: Constants.Tags.Input
            },
            twoFilledStar,
            {
                attributes: [
                    { name: Constants.AttributeName.Type, value: "radio" },
                    { name: Constants.AttributeName.Name, value: id },
                    { name: Constants.AttributeName.Value, value: "3" },
                ],
                tag: Constants.Tags.Input
            },
            threeFilledStar,
            {
                attributes: [
                    { name: Constants.AttributeName.Type, value: "radio" },
                    { name: Constants.AttributeName.Name, value: id },
                    { name: Constants.AttributeName.Value, value: "4" },
                ],
                tag: Constants.Tags.Input
            },
            fourFilledStar,
            {
                attributes: [
                    { name: Constants.AttributeName.Type, value: "radio" },
                    { name: Constants.AttributeName.Name, value: id },
                    { name: Constants.AttributeName.Value, value: "5" },
                ],
                tag: Constants.Tags.Input
            },
            fiveFilledStar,
        ],
        classes: [Constants.Classes.Rating],
        id: id,
        tag: Constants.Tags.Span
    };
}
exports.generate = generate;
},{"./../Constants":43}],77:[function(require,module,exports){
"use strict";
/**
* Renderer.ts
*
* Module for rendering the markup
*/
exports.__esModule = true;
var Constants = require("./../Constants");
/**
 * Create DOM elements from Json structure
 * @param {UiAsJson} schema The Json structure
 * @param {boolean} svg Create svg element instead of html?
 * @return {HTMLElement} HTML elements with tree structure
 */
function elementFromJson(schema, svg) {
    if (typeof schema.brs === "undefined") {
        schema.brs = true;
    }
    if (!schema.brs) {
        return null;
    }
    if (!schema.tag) {
        schema.tag = Constants.Tags.Div;
    }
    var element;
    if (schema.tag === Constants.Tags.Svg) {
        svg = true;
    }
    if (svg) {
        element = document.createElementNS("http://www.w3.org/2000/svg", schema.tag);
    }
    else {
        element = document.createElement(schema.tag);
    }
    if (schema.attributes) {
        var attribute = void 0;
        for (var i = 0; i < schema.attributes.length; i++) {
            attribute = schema.attributes[i];
            if (attribute.name === Constants.AttributeName.xlinkHref) {
                element.setAttributeNS("http://www.w3.org/1999/xlink", Constants.AttributeName.HRef, attribute.value);
            }
            else {
                element.setAttribute(attribute.name, attribute.value);
            }
        }
    }
    if (schema.id) {
        element.id = schema.id;
    }
    if (schema.classes) {
        var concatClasses = schema.classes.join(" ");
        if (svg) {
            element.setAttribute(Constants.AttributeName.Class, concatClasses);
        }
        else {
            element.className = concatClasses;
        }
    }
    if (schema.innerText && !svg) {
        element.textContent = schema.innerText;
    }
    if (schema.innerHTML && !svg) {
        element.innerHTML = schema.innerHTML;
    }
    if (schema.children) {
        for (var i = 0; i < schema.children.length; i++) {
            // Sometimes IE mis-reports length
            var cur = schema.children[i];
            if (cur) {
                var child = elementFromJson(cur, svg);
                if (child) {
                    element.appendChild(child);
                }
            }
        }
    }
    return element;
}
exports.elementFromJson = elementFromJson;
},{"./../Constants":43}],78:[function(require,module,exports){
"use strict";
/**
* Spinner.ts
*
* A module for a spinner.
*/
exports.__esModule = true;
var Constants = require("./../Constants");
var Utils = require("./Utils");
var animationSpeed = 90;
var numCircles = 8;
var offsetSize = 0.2;
var parentSize = 34;
var fadeIncrement = 1 / numCircles;
var Spinner = (function () {
    /**
     * Constructor
     * @param id id of the element to attach the spinner to
     */
    function Spinner(id) {
        this.circleObjects = [];
        this.spinnerId = id;
        this.spinner = document.getElementById(this.spinnerId);
        this.createCirclesAndArrange();
        this.initializeOpacities();
        this.start();
        Utils.setElementVisibility(id, true);
    }
    /**
     * Destroys the spinner
     */
    Spinner.prototype.destroy = function () {
        Utils.setElementVisibility(this.spinnerId, false);
        this.stop();
    };
    /**
     * Starts the animation
     */
    Spinner.prototype.start = function () {
        var _this = this;
        this.stop();
        this.interval = setInterval(function () {
            var i = _this.circleObjects.length;
            while (i--) {
                fade(_this.circleObjects[i]);
            }
        }, animationSpeed);
    };
    /**
     * Stops the animation
     */
    Spinner.prototype.stop = function () {
        clearInterval(this.interval);
    };
    Spinner.prototype.createCirclesAndArrange = function () {
        var angle = 0;
        var offset = parentSize * offsetSize;
        var step = (2 * Math.PI) / numCircles;
        var i = numCircles;
        var circleObject;
        var radius = (parentSize - offset) * 0.5;
        while (i--) {
            var circle = createCircle();
            var x = Math.round(parentSize * 0.5 + radius * Math.cos(angle) - circle.clientWidth * 0.5) - offset * 0.5;
            var y = Math.round(parentSize * 0.5 + radius * Math.sin(angle) - circle.clientHeight * 0.5) - offset * 0.5;
            this.spinner.appendChild(circle);
            circle.style.left = x + "px";
            circle.style.top = y + "px";
            angle += step;
            circleObject = { element: circle, j: i };
            this.circleObjects.push(circleObject);
        }
    };
    Spinner.prototype.initializeOpacities = function () {
        var i = 0;
        var j = 1;
        var opacity;
        for (i; i < numCircles; i++) {
            var circleObject = this.circleObjects[i];
            opacity = (fadeIncrement * j++);
            setOpacity(circleObject.element, opacity);
        }
    };
    return Spinner;
}());
exports.Spinner = Spinner;
function fade(circleObject) {
    var opacity = getOpacity(circleObject.element) - fadeIncrement;
    if (opacity <= 0) {
        opacity = 1;
    }
    setOpacity(circleObject.element, opacity);
}
function getOpacity(element) {
    return parseFloat(window.getComputedStyle(element).getPropertyValue("opacity"));
}
function setOpacity(element, opacity) {
    element.style.opacity = opacity.toString();
}
function createCircle() {
    var circle = document.createElement("div");
    circle.classList.add(Constants.Classes.SpinnerCircle);
    circle.style.width = circle.style.height = parentSize * offsetSize + "px";
    return circle;
}
},{"./../Constants":43,"./Utils":83}],79:[function(require,module,exports){
"use strict";
/**
 * Events.ts
 *
 * A module for all Event handling.
 */
exports.__esModule = true;
var Transport_1 = require("./../../Transport/Transport");
var Constants_1 = require("./../../Constants");
var UiUtils = require("./../Utils");
var SpinnerControl_1 = require("./../SpinnerControl");
var Logging = require("./../../Logging/Logging");
var Configuration = require("./../../Configuration/Configuration");
var Api = require("@ms-ofb/officefloodgatecore/dist/src/Api/Api");
/**
 * Callback for when the feedback dialog is dismissed
 */
var onDismiss;
/**
 * Is the prompt up
 */
var isPromptUp;
/**
 * Dismiss all, including networking, UI, and events
 * @param submitted Was the control submitted (true), or cancelled (false)?
 */
function dismissAll(submitted) {
    unregister();
    onDismiss(submitted);
}
/**
 * Listener un-registration
 */
function unregister() {
    removeListeners();
}
/**
 * List of listeners and the ids they are attached to. This ensures all events are correctly unregistered.
 */
var listenersList = [];
function addListener(id, event, listener) {
    UiUtils.registerListener(id, event, listener);
    listenersList.push({ event: event, id: id, listener: listener });
}
function removeListeners() {
    for (var _i = 0, listenersList_1 = listenersList; _i < listenersList_1.length; _i++) {
        var listener = listenersList_1[_i];
        UiUtils.unregisterListener(listener.id, listener.event, listener.listener);
    }
    listenersList = [];
}
/**
 * Register events for toast
 */
function register(ON_DISMISS) {
    if (ON_DISMISS === void 0) { ON_DISMISS = function (submitted) { return; }; }
    onDismiss = ON_DISMISS;
    isPromptUp = true;
    addListener(Constants_1.IDs.ToastContainer, "keyup", toastKeyEventHandler);
    addListener(Constants_1.IDs.ToastCancel, "click", toastCancelHandler);
    addListener(Constants_1.IDs.TPromptContainer, "click", promptContainerHandler);
    addListener(Constants_1.IDs.TFormSubmitButton, "click", submitButtonHandler);
    addListener(Constants_1.IDs.TFormEmailCheckBox, "click", emailCheckBoxHandler);
    emailCheckBoxHandler(null); // call the checkbox handler to process the initial state
    var ratingElements = document.querySelectorAll("input[name=\"" + Constants_1.IDs.TFormRating + "\"]");
    for (var i = 0; i < ratingElements.length; ++i) {
        UiUtils.registerListenerToElement(ratingElements[i], "click", ratingInputHandler);
    }
    if (!Configuration.get().getFloodgateSurvey().showPrompt) {
        showSurveyScreen();
    }
    else {
        Logging.getLogger().logEvent(Logging.EventIds.Survey.UI.Prompt.Shown.VALUE, {
            CampaignId: Configuration.get().getFloodgateSurvey().getCampaignId(),
            SurveyId: Configuration.get().getFloodgateSurvey().getId(),
            SurveyType: Configuration.get().getFloodgateSurvey().getSurveyType()
        });
    }
    // Auto dismiss if needed
    var autoDimiss = Configuration.get().getFloodgateInitOptions().autoDismiss;
    if (autoDimiss !== Constants_1.AutoDismissValues.NoAutoDismiss) {
        var autoDimissDuration = void 0;
        switch (autoDimiss) {
            case (Constants_1.AutoDismissValues.SevenSeconds):
                autoDimissDuration = 7000;
                break;
            case (Constants_1.AutoDismissValues.FourteenSeconds):
                autoDimissDuration = 14000;
                break;
            case (Constants_1.AutoDismissValues.TwentyOneSeconds):
                autoDimissDuration = 21000;
                break;
            case (Constants_1.AutoDismissValues.TwentyEightSeconds):
                autoDimissDuration = 28000;
                break;
            default:
        }
        if (autoDimissDuration !== undefined) {
            setTimeout(function () {
                if (isPromptUp) {
                    dismissAll(false);
                }
            }, autoDimissDuration);
        }
    }
}
exports.register = register;
function emailCheckBoxHandler(event) {
    // show email if checked and show default string if unchecked
    var emailCheckBox = document.getElementById(Constants_1.IDs.TFormEmailCheckBox);
    if (emailCheckBox) {
        var emailTextBox = document.getElementById(Constants_1.IDs.TFormEmailTextBox);
        emailTextBox.value = emailCheckBox.checked ? Configuration.get().getCommonInitOptions().userEmail : null;
        emailTextBox.disabled = !emailCheckBox.checked;
    }
}
function toastKeyEventHandler(event) {
    // dismiss upon pressing the escape key
    if (event.keyCode === Constants_1.Keys.Esc) {
        event.preventDefault();
        event.stopPropagation();
        dismissAll(false);
    }
}
function toastCancelHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    dismissAll(false);
}
function promptContainerHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    showSurveyScreen();
}
function showSurveyScreen() {
    isPromptUp = false;
    UiUtils.setElementVisibility(Constants_1.IDs.TPromptContainer, false);
    UiUtils.setElementVisibility(Constants_1.IDs.TFormContainer, true);
    Logging.getLogger().logEvent(Logging.EventIds.Survey.UI.Form.Shown.VALUE, {
        CampaignId: Configuration.get().getFloodgateSurvey().getCampaignId(),
        SurveyId: Configuration.get().getFloodgateSurvey().getId(),
        SurveyType: Configuration.get().getFloodgateSurvey().getSurveyType()
    });
}
function ratingInputHandler(event) {
    document.getElementById(Constants_1.IDs.TFormSubmitButton).disabled = false;
}
function submitButtonHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    UiUtils.setElementVisibility(Constants_1.IDs.TFormSubmitButton, false);
    var spinner = new SpinnerControl_1.Spinner(Constants_1.IDs.TFormSubmitButtonSpinner);
    var transporter = new Transport_1.Transporter(Configuration.get().getCommonInitOptions().environment, Api.ISurvey.Type[Configuration.get().getFloodgateSurvey().getSurveyType()], Configuration.get().getCommonInitOptions().appId, "Survey", Configuration.get().getCommonInitOptions().applicationGroup, Configuration.get().getCommonInitOptions().telemetryGroup, Configuration.get().getCommonInitOptions().webGroup);
    var commentElement = document.getElementById(Constants_1.IDs.TFormComment);
    var commentEntered = (commentElement && !!commentElement.value);
    var selectedRating = document.querySelector("input[name=\"" + Constants_1.IDs.TFormRating + "\"]:checked");
    Configuration.get().getFloodgateSurvey().setValues(Number(selectedRating.value), commentEntered ? commentElement.value : "");
    // Add survey-specific data to manifest
    transporter.setManifestValues(Configuration.get().getFloodgateSurvey().getJsonElements());
    // Send email address if user gives consent
    var emailCheckBox = document.getElementById(Constants_1.IDs.TFormEmailCheckBox);
    var emailTextBox = document.getElementById(Constants_1.IDs.TFormEmailTextBox);
    if (emailCheckBox && emailCheckBox.checked && emailTextBox.value !== "") {
        transporter.setEmail(emailTextBox.value);
    }
    transporter.submit();
    spinner.destroy();
    dismissAll(true);
    Logging.getLogger().logEvent(Logging.EventIds.Survey.UI.Form.Submit.VALUE, {
        CampaignId: Configuration.get().getFloodgateSurvey().getCampaignId(),
        SurveyId: Configuration.get().getFloodgateSurvey().getId(),
        SurveyType: Configuration.get().getFloodgateSurvey().getSurveyType()
    });
}
},{"./../../Configuration/Configuration":42,"./../../Constants":43,"./../../Logging/Logging":54,"./../../Transport/Transport":64,"./../SpinnerControl":78,"./../Utils":83,"@ms-ofb/officefloodgatecore/dist/src/Api/Api":5}],80:[function(require,module,exports){
"use strict";
/**
 * Layout.ts
 *
 * Module for the layout
 */
exports.__esModule = true;
var ChoiceGroupControl = require("./../ChoiceGroupControl");
var Configuration = require("./../../Configuration/Configuration");
var Constants_1 = require("./../../Constants");
var UIStrings = require("./../../UIStrings/UIStrings");
var Utils = require("./../Utils");
var Constants = require("./../../Constants");
/**
 * Generates the toast
 *
 * @returns {Renderer.IUIAsJson} Renderer.IUIAsJson object
 */
function generate() {
    var schema = {
        attributes: [
            { name: Constants_1.AttributeName.DataHtml2CanvasIgnore, value: Constants_1.AttributeValue.True },
            { name: Constants_1.AttributeName.Role, value: "dialog" },
            { name: "aria-labelledby", value: Constants_1.IDs.TPromptTitle },
            { name: "aria-describedby", value: Constants_1.IDs.TPromptText },
        ],
        children: [
            {
                attributes: [
                    { name: Constants_1.AttributeName.Type, value: Constants_1.AttributeValue.Button },
                    { name: Constants_1.AttributeName.AriaLabel, value: UIStrings.getUIStrings().CloseLabel },
                ],
                id: Constants_1.IDs.ToastCancel,
                // tslint:disable-next-line:max-line-length
                innerHTML: '<svg viewBox="4 4 16 16" width="16px" height="16px" focusable="false"><path d="M19,6.41L17.59,5 12,10.59 6.41,5 5,6.41 10.59,12 5,17.59 6.41,19 12,13.41 17.59,19 19,17.59 13.41,12z" fill="#000"/></svg>',
                tag: Constants_1.Tags.Button
            },
            generatePrompt(),
            generateForm(),
        ],
        classes: [Constants_1.Classes.Toast, Utils.isRightToLeft() ? Constants_1.Classes.Rtl : ""],
        id: Constants_1.IDs.ToastContainer
    };
    return schema;
}
exports.generate = generate;
function generatePrompt() {
    var promptSchema = {
        attributes: [{ name: "aria-labelledby", value: Constants_1.IDs.TPromptTitle }],
        children: [
            {
                classes: [
                    Constants_1.Classes.FontText,
                    Constants_1.Classes.TextAlignLeft,
                ],
                id: Constants_1.IDs.TPromptTitle,
                innerText: Configuration.get().getFloodgateSurvey().getTitle()
            },
            {
                classes: [
                    Constants_1.Classes.FontSubText,
                    Constants_1.Classes.TextAlignLeft,
                ],
                id: Constants_1.IDs.TPromptText,
                innerText: Configuration.get().getFloodgateSurvey().getPromptQuestion()
            },
        ],
        id: Constants_1.IDs.TPromptContainer,
        tag: Constants_1.Tags.Button
    };
    return promptSchema;
}
function userEmailConsentDefault() {
    var userEmailConsentDefault = Configuration.get().getCommonInitOptions().userEmailConsentDefault;
    return userEmailConsentDefault ? Constants.AttributeValue.Checked : Constants.AttributeValue.Unchecked;
}
function generateForm() {
    var formSchema = {
        children: [
            {
                classes: [
                    Constants_1.Classes.FontText,
                    Constants_1.Classes.TextAlignLeft,
                ],
                id: Constants_1.IDs.TFormTitle,
                innerText: Configuration.get().getFloodgateSurvey().getTitle()
            },
            generateRatingControl(),
            {
                attributes: [
                    {
                        name: Constants_1.AttributeName.Placeholder,
                        value: Configuration.get().getFloodgateSurvey().getCommentQuestion()
                    },
                    {
                        name: Constants_1.AttributeName.AriaLabel,
                        value: Configuration.get().getFloodgateSurvey().getCommentQuestion()
                    },
                    {
                        name: Constants_1.AttributeName.MaxLength,
                        value: Constants_1.AttributeValue.TextAreaMaxLength
                    },
                ],
                classes: [Constants_1.Classes.FontSubText, Constants_1.Classes.TextInput],
                id: Constants_1.IDs.TFormComment,
                tag: Constants_1.Tags.TextArea
            },
            {
                brs: Configuration.get().getFloodgateSurvey().showEmailRequest,
                children: [
                    {
                        attributes: [
                            {
                                name: Constants.AttributeName.Type,
                                value: Constants.AttributeValue.Checkbox
                            },
                            {
                                name: userEmailConsentDefault(),
                                value: ""
                            },
                        ],
                        classes: [Constants.Classes.TFormEmailCheckbox, Constants.Classes.CheckBox],
                        id: Constants.IDs.TFormEmailCheckBox,
                        tag: Constants.Tags.Input
                    },
                    {
                        attributes: [{ name: Constants.AttributeName.For, value: Constants.IDs.TFormEmailCheckBox }],
                        classes: [Constants.Classes.FontSubText, Constants.Classes.TextAlignLeft, Constants.Classes.TFormEmailLabel],
                        innerText: UIStrings.getUIStrings().Form.EmailCheckBoxLabel,
                        tag: Constants.Tags.Label
                    },
                    {
                        attributes: [
                            {
                                name: Constants.AttributeName.Type,
                                value: Constants.AttributeValue.Text
                            },
                            {
                                name: Constants.AttributeName.Placeholder,
                                value: UIStrings.getUIStrings().Form.EmailPlaceholder
                            },
                            {
                                name: Constants.AttributeName.AriaLabel,
                                value: UIStrings.getUIStrings().Form.EmailPlaceholder
                            },
                            {
                                name: Constants.AttributeName.Name,
                                value: Constants.IDs.BasicFormEmailInput
                            },
                            {
                                name: Constants.AttributeName.MaxLength,
                                value: Constants.AttributeValue.TextAreaMaxLength
                            },
                            {
                                name: Constants.AttributeName.Value,
                                value: Configuration.get().getCommonInitOptions().userEmailConsentDefault
                                    ? Configuration.get().getCommonInitOptions().userEmail
                                    : ""
                            },
                        ],
                        classes: [Constants.Classes.FontSubText, Constants.Classes.FormEmailInput, Constants.Classes.TextInput],
                        id: Constants.IDs.TFormEmailTextBox,
                        tag: Constants.Tags.Input
                    },
                ]
            },
            {
                children: [
                    {
                        attributes: [
                            {
                                name: Constants_1.AttributeName.HRef,
                                value: Constants_1.Urls.PrivacyStatementLink
                            },
                            {
                                name: Constants_1.AttributeName.Target,
                                value: Constants_1.AttributeValue.BlankWindow
                            },
                            {
                                name: Constants_1.AttributeName.Rel,
                                value: Constants_1.AttributeValue.NoReferrer
                            },
                        ],
                        classes: [Constants_1.Classes.Link],
                        innerText: UIStrings.getUIStrings().PrivacyStatement,
                        tag: Constants_1.Tags.Anchor
                    },
                ],
                classes: [Constants_1.Classes.FontSubSubText, Constants_1.Classes.TextAlignLeft, Constants_1.Classes.PrivacyStatementLinkDiv]
            },
            {
                children: [
                    {
                        attributes: [{ name: Constants_1.AttributeName.Disabled, value: Constants_1.AttributeValue.True }],
                        classes: [
                            Constants_1.Classes.FontSubText,
                            Constants_1.Classes.SubmitButton,
                        ],
                        id: Constants_1.IDs.TFormSubmitButton,
                        innerText: UIStrings.getUIStrings().Form.Submit,
                        tag: Constants_1.Tags.Button
                    },
                    {
                        classes: [Constants_1.Classes.Spinner, Constants_1.Classes.Hidden],
                        id: Constants_1.IDs.TFormSubmitButtonSpinner,
                        tag: Constants_1.Tags.Div
                    },
                ],
                id: Constants_1.IDs.TFormSubmitButtonContainer
            },
        ],
        classes: [Constants_1.Classes.Hidden],
        id: Constants_1.IDs.TFormContainer
    };
    return formSchema;
}
function generateRatingControl() {
    var choices = [];
    var ratingValues = Configuration.get().getFloodgateSurvey().getRatingValuesAscending();
    var index = 0;
    for (var _i = 0, ratingValues_1 = ratingValues; _i < ratingValues_1.length; _i++) {
        var ratingValue = ratingValues_1[_i];
        choices.push([index, ratingValue]);
        index++;
    }
    // Ratings need to be shown in descending order
    return ChoiceGroupControl.generateRadioGroup(Constants_1.IDs.TFormRating, Configuration.get().getFloodgateSurvey().getRatingQuestion(), choices.reverse());
}
},{"./../../Configuration/Configuration":42,"./../../Constants":43,"./../../UIStrings/UIStrings":65,"./../ChoiceGroupControl":75,"./../Utils":83}],81:[function(require,module,exports){
"use strict";
/**
 * Toast.ts
 *
 * Module for the Toast UI
 */
exports.__esModule = true;
var Constants_1 = require("./../../Constants");
var Events = require("./Events");
var Layout = require("./Layout");
var Renderer = require("./../Renderer");
var Utils = require("./../Utils");
var Configuration = require("./../../Configuration/Configuration");
/**
 * UI initialization for toast
 */
function createSurvey(onClose) {
    create(Renderer.elementFromJson(Layout.generate()));
    Events.register(function (submitted) {
        Utils.setElementVisibility(Constants_1.IDs.ToastContainer, false);
        Utils.deleteElementById(Constants_1.IDs.ToastContainer);
        Configuration.get().getFloodgateInitOptions().onDismiss(Configuration.get().getFloodgateSurvey().getCampaignId(), submitted);
        onClose();
    });
}
exports.createSurvey = createSurvey;
function create(userInterface) {
    document.body.insertBefore(userInterface, document.body.firstChild);
    Utils.setElementVisibility(Constants_1.IDs.ToastContainer, true);
}
},{"./../../Configuration/Configuration":42,"./../../Constants":43,"./../Renderer":77,"./../Utils":83,"./Events":79,"./Layout":80}],82:[function(require,module,exports){
"use strict";
/**
* UI.ts
*
* Module for the UI
*/
exports.__esModule = true;
var BellyBand_1 = require("./BellyBand/BellyBand");
exports.createBellyBandMulti = BellyBand_1.createMulti;
var BellyBand_2 = require("./BellyBand/BellyBand");
exports.createBellyBandSingle = BellyBand_2.createSingle;
var Toast_1 = require("./Toast/Toast");
exports.createSurvey = Toast_1.createSurvey;
},{"./BellyBand/BellyBand":66,"./Toast/Toast":81}],83:[function(require,module,exports){
"use strict";
/**
* Utils.ts
*
* Module for utility functions
*/
exports.__esModule = true;
var Constants = require("./../Constants");
/**
 * Set HTML element visibility
 * @param {string} id The Id of the HTML element
 * @param {any} vis The visibility to be set (true or false)
 * @return {void}
 */
function setElementVisibility(id, vis) {
    var oldClassName = vis ? Constants.Classes.Hidden : Constants.Classes.Visible;
    var newClassName = vis ? Constants.Classes.Visible : Constants.Classes.Hidden;
    replaceClassesById(id, oldClassName, newClassName);
}
exports.setElementVisibility = setElementVisibility;
/**
 * Delete HTML element by Id
 * @param {string} id The Id of the HTML element
 * @return {void}
 */
function deleteElementById(id) {
    var element = document.getElementById(id);
    if (element != null && element.parentNode != null) {
        element.parentNode.removeChild(element);
    }
}
exports.deleteElementById = deleteElementById;
/**
 * Add a CSS class to an HTML element by Id
 * @param {string} id The Id of the HTML element
 * @param {string} newClassName The name of CSS class to be added
 * @return {void}
 */
function addClassById(id, newClass) {
    var element = document.getElementById(id);
    if (!element) {
        return;
    }
    // check is the class already exists, if not add it
    if (!element.className.match(new RegExp("\\b" + newClass + "\\b"))) {
        // we use className instead of classList to support IE9
        element.className = element.className + " " + newClass;
    }
}
exports.addClassById = addClassById;
/**
 * Delete a CSS class of an HTML element by Id
 * @param {string} id The Id of the HTML element
 * @param {string} oldClassName The name of CSS class to be deleted
 * @return {void}
 */
function deleteClassById(id, oldClass) {
    var element = document.getElementById(id);
    if (!element) {
        return;
    }
    // we use className instead of classList to support IE9
    // get rid of any occurrences of the class we don"t want
    element.className = element.className.split(new RegExp("\\b" + oldClass + "\\b", "i")).join(" ");
    // get rid of extra whitespaces
    element.className = element.className.split(/\s+/).join(" ");
}
exports.deleteClassById = deleteClassById;
/**
 * Delete an CSS class and (or) add an CSS class to an HTML element by Id
 * @param {string} id The Id of the HTML element
 * @param {string} oldClassName The name of CSS class to be deleted
 * @param {string} newClassName The name of CSS class to be added
 * @return {void}
 */
function replaceClassesById(id, oldClassName, newClassName) {
    deleteClassById(id, oldClassName);
    addClassById(id, newClassName);
}
exports.replaceClassesById = replaceClassesById;
/**
 * Set attribute on an HTML element
 * @param {string} id The Id of the HTML element
 * @param {string} attriName The attribute name
 * @param {string} attriValue The attribute value
 * @return {void}
 */
function setAttributeOnHtmlElement(id, attriName, attriValue) {
    var htmlElement = document.getElementById(id);
    if (htmlElement) {
        htmlElement.setAttribute(attriName, attriValue);
    }
}
exports.setAttributeOnHtmlElement = setAttributeOnHtmlElement;
/**
 * Add event listener helper function (wrapper) that deals with IE 8 compatability
 * @param object The object to add event listener to
 * @param type The event type
 * @param listener The listener function
 */
function addEventListenerHelper(object, type, listener) {
    if (object.addEventListener) {
        object.addEventListener(type, listener, false);
    }
    else if (object.attachEvent) {
        object.attachEvent("on" + type, listener);
    }
}
exports.addEventListenerHelper = addEventListenerHelper;
/**
 * Remove event listener helper function (wrapper) that deals with IE 8 compatability
 * @param object The object to remove event listener from
 * @param type The event type
 * @param listener The listener function
 */
function removeEventListenerHelper(object, type, listener) {
    if (object.removeEventListener) {
        object.removeEventListener(type, listener, false);
    }
    else if (object.detachEvent) {
        object.detachEvent("on" + type, listener);
    }
}
exports.removeEventListenerHelper = removeEventListenerHelper;
/**
 * Register event listener
 * @param id The Id of the HTML element
 * @param type The event type
 * @param listener The listener function
 */
function registerListener(id, type, listener) {
    var element = document.getElementById(id);
    if (element) {
        addEventListenerHelper(element, type, listener);
    }
}
exports.registerListener = registerListener;
/**
 * Register event listener
 * @param element The HTML element
 * @param type The event type
 * @param listener The listener function
 */
function registerListenerToElement(element, type, listener) {
    if (element) {
        addEventListenerHelper(element, type, listener);
    }
}
exports.registerListenerToElement = registerListenerToElement;
/**
 * Un-register event listener
 * @param id The Id of the HTML element
 * @param type The event type
 * @param listener The listener function
 */
function unregisterListener(id, type, listener) {
    var element = document.getElementById(id);
    if (element) {
        removeEventListenerHelper(element, type, listener);
    }
}
exports.unregisterListener = unregisterListener;
/**
 * Returns the version of Internet Explorer or -1 for non-IE browser
 * @return {number} The IE version
 */
function getInternetExplorerVersion() {
    var rv = -1;
    var ua = window.navigator.userAgent;
    // since IE 11, 'MSIE' is not a keyword in its user agent string anymore
    // determine whether the browser is IE or not, and the version of IE based on Trident keyword and its version
    if (ua.indexOf("Trident") > -1) {
        var re = new RegExp("Trident/([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
            rv = parseFloat(RegExp.$1);
            rv += 4; // trident version + 4 is the IE version
        }
    }
    return rv;
}
exports.getInternetExplorerVersion = getInternetExplorerVersion;
/**
 * Check if the current text direction is right to left
 */
function isRightToLeft() {
    return getComputedStyle(document.documentElement).direction === "rtl";
}
exports.isRightToLeft = isRightToLeft;
},{"./../Constants":43}],84:[function(require,module,exports){
"use strict";
/*
* Utils.ts
*
* Module for utility functions
*/
exports.__esModule = true;
/**
 * Check if given value is a number
 * @param {any} value value
 */
function isNumber(value) {
    return (typeof value === "number");
}
/**
 * Check if given value is an integer
 * @param {any} value value
 */
function isInteger(value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
}
exports.isInteger = isInteger;
/**
 * Check if given value is a string
 * @param {any} value value
 */
function isString(value) {
    return (typeof value === "string");
}
/**
 * Check if value is an object
 * @param {any} value value
 */
function isObject(value) {
    return (!isNullorUndefined(value) && typeof (value) === "object");
}
/**
 * Check if value is an object
 * @param {any} value value
 */
function isBoolean(value) {
    return typeof (value) === "boolean";
}
exports.isBoolean = isBoolean;
/**
 * Check if value is "null" or "undefined"
 * @param {any} value value
 */
function isNullorUndefined(value) {
    return (value == null);
}
/**
 * Check if value is a valid guid
 * @param {any} value value
 */
function isGuid(value) {
    return (isString(value) &&
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value));
}
/**
 * Throw if not object
 */
function expectObject(value, name) {
    if (!isObject(value)) {
        throw name + " is not an object: " + value;
    }
}
exports.expectObject = expectObject;
/**
 * Throw if not number
 */
function expectNumber(value, name) {
    if (!isNumber(value)) {
        throw name + " is not a number: " + value;
    }
}
exports.expectNumber = expectNumber;
/**
 * Throw if not string
 */
function expectString(value, name) {
    if (!isString(value)) {
        throw name + " is not a string: " + value;
    }
}
exports.expectString = expectString;
/**
 * Throw if not boolean
 */
function expectBoolean(value, name) {
    if (!isBoolean(value)) {
        throw name + " is not a boolean: " + value;
    }
}
exports.expectBoolean = expectBoolean;
/**
 * Throw if not guid
 */
function expectGuid(value, name) {
    if (!isGuid(value)) {
        throw name + " is not a guid: " + value;
    }
}
exports.expectGuid = expectGuid;
/**
 * Throw if not array
 */
function expectArray(value, name) {
    if (!Array.isArray(value)) {
        throw name + " is not an array: " + value;
    }
}
exports.expectArray = expectArray;
/**
 * Create guid string
 */
function guid() {
    // Stitch in '4' in the third group
    return (randomHex4() + randomHex4() + "-" + randomHex4() + "-4" + randomHex4().substr(0, 3) + "-" + randomHex4() + "-"
        + randomHex4() + randomHex4() + randomHex4()).toLowerCase();
}
exports.guid = guid;
/**
 * Create random Hex4 string
 */
function randomHex4() {
    return (Math.floor(((1 + Math.random()) * 0x10000))).toString(16).substring(1);
}
/**
 * Takes two objects (source, target) and returns the target object with values in the source added to it.
 * It overwrites any source properties which already exist in target.
 * @param sourceObject the source
 * @param targetobject the target
 * @returns the result
 */
function overrideValues(sourceObject, targetobject) {
    if (!targetobject) {
        return targetobject;
    }
    var result = targetobject;
    if (sourceObject) {
        for (var field in sourceObject) {
            if (sourceObject.hasOwnProperty(field)) {
                result[field] = sourceObject[field];
            }
        }
    }
    return result;
}
exports.overrideValues = overrideValues;
},{}],85:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports["default"] = "1.2.7";
},{}],86:[function(require,module,exports){
"use strict";
/**
 * WindowProperties.ts
 *
 * Module to track window properties.
 */
exports.__esModule = true;
/**
 * Is the window narrow?
 * @returns True if it is, false otherwise
 */
function isNarrow() {
    var narrowScreenBoundary = 800;
    if (window.innerWidth) {
        return window.innerWidth < narrowScreenBoundary;
    }
    // if we can't find the width; go with narrow.
    return true;
}
exports.isNarrow = isNarrow;
},{}],87:[function(require,module,exports){
"use strict";
/**
* Window.ts
*
* Module wrapping around the global window object
*/
exports.__esModule = true;
/**
 * Get the IWindow object
 */
function get() { return window; }
exports.get = get;
/**
 * Set the setUiStrings() method
 * @param setUiStrings the method
 */
function setSetUiStrings(setUiStrings) {
    window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
    window.OfficeBrowserFeedback.setUiStrings = setUiStrings;
}
exports.setSetUiStrings = setSetUiStrings;
/**
 * Set the singleFeedback() method
 * @param singleFeedback the method
 */
function setSingleFeedback(singleFeedback) {
    window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
    window.OfficeBrowserFeedback.singleFeedback = singleFeedback;
}
exports.setSingleFeedback = setSingleFeedback;
/**
 * Set the multiFeedback() method
 * @param multiFeedback the method
 */
function setMultiFeedback(multiFeedback) {
    window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
    window.OfficeBrowserFeedback.multiFeedback = multiFeedback;
}
exports.setMultiFeedback = setMultiFeedback;
/**
 * Set the floodgate showSurvey() method
 * @param floodgateShowSurvey the method
 */
function setFloodgateShowSurvey(floodgateShowSurvey) {
    window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
    window.OfficeBrowserFeedback.floodgate = window.OfficeBrowserFeedback.floodgate || {};
    window.OfficeBrowserFeedback.floodgate.showSurvey = floodgateShowSurvey;
}
exports.setFloodgateShowSurvey = setFloodgateShowSurvey;
/**
 * Set the floodgate showCustomSurvey() method
 * @param floodgateShowSurvey the method
 */
function setFloodgateShowCustomSurvey(floodgateShowCustomSurvey) {
    window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
    window.OfficeBrowserFeedback.floodgate = window.OfficeBrowserFeedback.floodgate || {};
    window.OfficeBrowserFeedback.floodgate.showCustomSurvey = floodgateShowCustomSurvey;
}
exports.setFloodgateShowCustomSurvey = setFloodgateShowCustomSurvey;
/**
 * Set the floodgate initialize() method
 * @param floodgateInitialize the method
 */
function setFloodgateInitialize(floodgateInitialize) {
    window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
    window.OfficeBrowserFeedback.floodgate = window.OfficeBrowserFeedback.floodgate || {};
    window.OfficeBrowserFeedback.floodgate.initialize = floodgateInitialize;
}
exports.setFloodgateInitialize = setFloodgateInitialize;
/**
 * Set the floodgate start() method
 * @param floodgateStart the method
 */
function setFloodgateStart(floodgateStart) {
    window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
    window.OfficeBrowserFeedback.floodgate = window.OfficeBrowserFeedback.floodgate || {};
    window.OfficeBrowserFeedback.floodgate.start = floodgateStart;
}
exports.setFloodgateStart = setFloodgateStart;
/**
 * Set the floodgate stop() method
 * @param floodgateStop the method
 */
function setFloodgateStop(floodgateStop) {
    window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
    window.OfficeBrowserFeedback.floodgate = window.OfficeBrowserFeedback.floodgate || {};
    window.OfficeBrowserFeedback.floodgate.stop = floodgateStop;
}
exports.setFloodgateStop = setFloodgateStop;
/**
 * Set the floodgate getEngine() method
 * @param floodgateGetEngine the method
 */
function setFloodgateGetEngine(floodgateGetEngine) {
    window.OfficeBrowserFeedback = window.OfficeBrowserFeedback || {};
    window.OfficeBrowserFeedback.floodgate = window.OfficeBrowserFeedback.floodgate || {};
    window.OfficeBrowserFeedback.floodgate.getEngine = floodgateGetEngine;
}
exports.setFloodgateGetEngine = setFloodgateGetEngine;
},{}],88:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	* AriaSDK.ts
	* Author: Abhilash Panwar (abpanwar)
	* Copyright: Microsoft 2016
	*/
	var Enums_1 = __webpack_require__(2);
	exports.AWTPiiKind = Enums_1.AWTPiiKind;
	var AWT_1 = __webpack_require__(3);
	exports.AWT = AWT_1.default;
	exports.AWT_COLLECTOR_URL_UNITED_STATES = 'https://us.pipe.aria.microsoft.com/Collector/3.0/';
	exports.AWT_COLLECTOR_URL_GERMANY = 'https://de.pipe.aria.microsoft.com/Collector/3.0/';
	exports.AWT_COLLECTOR_URL_JAPAN = 'https://jp.pipe.aria.microsoft.com/Collector/3.0/';
	exports.AWT_COLLECTOR_URL_AUSTRALIA = 'https://au.pipe.aria.microsoft.com/Collector/3.0/';
	exports.AWT_COLLECTOR_URL_EUROPE = 'https://eu.pipe.aria.microsoft.com/Collector/3.0/';


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	* Enums.ts
	* Author: Abhilash Panwar (abpanwar)
	* Copyright: Microsoft 2016
	* Common enum values used in the SDK.
	*/
	"use strict";
	var AWTPiiKind;
	(function (AWTPiiKind) {
	    AWTPiiKind[AWTPiiKind["NotSet"] = 0] = "NotSet";
	    AWTPiiKind[AWTPiiKind["DistinguishedName"] = 1] = "DistinguishedName";
	    AWTPiiKind[AWTPiiKind["GenericData"] = 2] = "GenericData";
	    AWTPiiKind[AWTPiiKind["IPV4Address"] = 3] = "IPV4Address";
	    AWTPiiKind[AWTPiiKind["IPv6Address"] = 4] = "IPv6Address";
	    AWTPiiKind[AWTPiiKind["MailSubject"] = 5] = "MailSubject";
	    AWTPiiKind[AWTPiiKind["PhoneNumber"] = 6] = "PhoneNumber";
	    AWTPiiKind[AWTPiiKind["QueryString"] = 7] = "QueryString";
	    AWTPiiKind[AWTPiiKind["SipAddress"] = 8] = "SipAddress";
	    AWTPiiKind[AWTPiiKind["SmtpAddress"] = 9] = "SmtpAddress";
	    AWTPiiKind[AWTPiiKind["Identity"] = 10] = "Identity";
	    AWTPiiKind[AWTPiiKind["Uri"] = 11] = "Uri";
	    AWTPiiKind[AWTPiiKind["Fqdn"] = 12] = "Fqdn";
	    // Supports scrubbing of the last octet in a IPV4 address. E.g. 10.121.227.147 becomes 10.121.227.*
	    AWTPiiKind[AWTPiiKind["IPV4AddressLegacy"] = 13] = "IPV4AddressLegacy";
	})(AWTPiiKind = exports.AWTPiiKind || (exports.AWTPiiKind = {}));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Enums_1 = __webpack_require__(2);
	var AWTTransmissionManager_1 = __webpack_require__(4);
	var Utils = __webpack_require__(12);
	var Version = __webpack_require__(15);
	var AllTokens = 'allTkns';
	var EventNameAndTypeRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|_){2,98}[a-zA-Z0-9]$/;
	var EventNameDotRegex = /\./g;
	var PropertyNameRegex = /^[a-zA-Z0-9](([a-zA-Z0-9|_|\.]){0,98}[a-zA-Z0-9])?$/;
	var AWT = (function () {
	    function AWT() {
	    }
	    AWT.initialize = function (tenantToken, configuration) {
	        if (configuration === void 0) { configuration = {}; }
	        if (this._isInitialized) {
	            // tslint:disable-next-line
	            throw 'Already Initialized';
	        }
	        this._defaultTenantToken = tenantToken;
	        this._overrideValuesFromConfig(configuration);
	        //Create sender
	        AWTTransmissionManager_1.default.initialize(this._config);
	        this._isInitialized = true;
	    };
	    AWT.flush = function (callback) {
	        if (this._isInitialized && !this._isDestroyed) {
	            AWTTransmissionManager_1.default.flush(callback);
	        }
	    };
	    AWT.flushAndTeardown = function () {
	        if (this._isInitialized && !this._isDestroyed) {
	            this._isDestroyed = true;
	            AWTTransmissionManager_1.default.flushAndTeardown();
	        }
	    };
	    AWT.setContext = function (name, property, tenantToken) {
	        if (tenantToken === void 0) { tenantToken = AllTokens; }
	        property = this._sanitizeProperty(name, property);
	        if (property === null) {
	            return;
	        }
	        if (!this._contextProperties[tenantToken]) {
	            this._contextProperties[tenantToken] = {};
	        }
	        this._contextProperties[tenantToken][name] = property;
	    };
	    AWT.logEvent = function (event) {
	        var _this = this;
	        if (this._isInitialized) {
	            if (!event.name || !event.properties) {
	                return;
	            }
	            event.name = event.name.toLowerCase();
	            event.name.replace(EventNameDotRegex, '_');
	            var typePrefix = '';
	            if (!event.type) {
	                event.type = 'custom';
	            }
	            else {
	                event.type.toLowerCase();
	                typePrefix = 'custom.';
	            }
	            if (!EventNameAndTypeRegex.test(event.name) || !EventNameAndTypeRegex.test(event.type)) {
	                return;
	            }
	            event.type = typePrefix + event.type;
	            if (isNaN(event.timestamp)) {
	                event.timestamp = (new Date()).getTime();
	            }
	            if (!event.tenantToken) {
	                event.tenantToken = this._defaultTenantToken;
	            }
	            event.id = Utils.newGuid();
	            Object.keys(event.properties).forEach(function (name) {
	                event.properties[name] = _this._sanitizeProperty(name, event.properties[name]);
	                if (event.properties[name] === null) {
	                    delete event.properties[name];
	                }
	            });
	            this._addContextIfAbsent(event, event.tenantToken);
	            this._addContextIfAbsent(event, AllTokens);
	            if (Object.keys(event.properties).length === 0) {
	                return;
	            }
	            this._setDefaultProperty(event, 'EventInfo.InitId', this._getInitId(event.tenantToken));
	            this._setDefaultProperty(event, 'EventInfo.Sequence', this._getSequenceId(event.tenantToken));
	            this._setDefaultProperty(event, 'EventInfo.SdkVersion', Version.FullVersionString);
	            this._setDefaultProperty(event, 'EventInfo.Name', event.name);
	            this._setDefaultProperty(event, 'EventInfo.Time', (new Date(event.timestamp)).toISOString());
	            AWTTransmissionManager_1.default.sendEvent(event);
	        }
	    };
	    AWT._overrideValuesFromConfig = function (config) {
	        if (config.collectorUrl) {
	            this._config.collectorUrl = config.collectorUrl;
	        }
	        if (config.sendingTimer > 1000) {
	            this._config.sendingTimer = config.sendingTimer;
	        }
	    };
	    AWT._getInitId = function (tenantToken) {
	        if (this._initIdMap[tenantToken] === undefined) {
	            this._initIdMap[tenantToken] = Utils.newGuid();
	        }
	        return this._initIdMap[tenantToken];
	    };
	    AWT._getSequenceId = function (tenantToken) {
	        if (this._sequenceIdMap[tenantToken] === undefined) {
	            this._sequenceIdMap[tenantToken] = 0;
	        }
	        return (++this._sequenceIdMap[tenantToken]).toString();
	    };
	    AWT._setDefaultProperty = function (event, name, value) {
	        event.properties[name] = { value: value, pii: Enums_1.AWTPiiKind.NotSet };
	    };
	    AWT._addContextIfAbsent = function (event, tenantToken) {
	        if (this._contextProperties[tenantToken]) {
	            var context_1 = this._contextProperties[tenantToken];
	            Object.keys(context_1).forEach(function (name) {
	                if (!event.properties[name]) {
	                    event.properties[name] = context_1[name];
	                }
	            });
	        }
	    };
	    AWT._sanitizeProperty = function (name, property) {
	        if (typeof property === 'string' || typeof property === 'number' || typeof property === 'boolean') {
	            property = { value: property };
	        }
	        if (!PropertyNameRegex.test(name) || property === undefined || property === null
	            || property.value === null || property.value === undefined || property.value === '') {
	            return null;
	        }
	        if (typeof property.pii === 'undefined') {
	            property.pii = Enums_1.AWTPiiKind.NotSet;
	        }
	        property.value = property.value.toString();
	        return Utils.isPii(property.pii) ? property : null;
	    };
	    return AWT;
	}());
	AWT._isInitialized = false;
	AWT._isDestroyed = false;
	AWT._contextProperties = {};
	AWT._sequenceIdMap = {};
	AWT._initIdMap = {};
	AWT._config = {
	    collectorUrl: 'https://browser.pipe.aria.microsoft.com/Collector/3.0/',
	    sendingTimer: 1000
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AWT;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AWTRecordBatcher_1 = __webpack_require__(5);
	var AWTBondSerializer_1 = __webpack_require__(6);
	var AWTRetryPolicy_1 = __webpack_require__(13);
	var AWTKillSwitch_1 = __webpack_require__(14);
	var Version = __webpack_require__(15);
	var FlushCheckTimer = 250;
	var RequestSizeLimitBytes = 2936012; //approx 2.8 Mb
	var MaxRetries = 4;
	var AWTTransmissionManager = (function () {
	    function AWTTransmissionManager() {
	    }
	    AWTTransmissionManager.initialize = function (config) {
	        this._inboundQueues.push([]);
	        this._recordBatcher = new AWTRecordBatcher_1.default(RequestSizeLimitBytes, this._outboundQueue);
	        this._newEventsAllowed = true;
	        if (typeof Uint8Array === 'undefined') {
	            this._urlString += '&content-encoding=base64';
	        }
	        this._sendingTimer = config.sendingTimer;
	        this._urlString = config.collectorUrl + this._urlString + '&x-apikey=';
	    };
	    //Push the event into the inbound queue and return
	    AWTTransmissionManager.sendEvent = function (event) {
	        var _this = this;
	        if (this._newEventsAllowed) {
	            //Add event to the last inbound queue
	            this._inboundQueues[this._inboundQueues.length - 1].push(event);
	            if (!this._running && this._timeout < 0 && !this._isCurrentlyFlushing) {
	                this._timeout = setTimeout(function () { return _this._batchAndSendEvents(false); }, this._sendingTimer);
	            }
	        }
	    };
	    AWTTransmissionManager.flushAndTeardown = function () {
	        this._newEventsAllowed = false;
	        this._batchAndSendEvents(true);
	    };
	    AWTTransmissionManager.flush = function (callback) {
	        this._inboundQueues.push([]);
	        if (!this._isCurrentlyFlushing) {
	            this._isCurrentlyFlushing = true;
	            this._flush(callback);
	        }
	        else {
	            this._flushQueue.push(callback);
	        }
	    };
	    AWTTransmissionManager._batchAndSendEvents = function (isTeardown) {
	        this._running = true;
	        while (this._inboundQueues[0].length > 0 && this._outboundQueue.length < 1) {
	            this._recordBatcher.addEventToBatch(this._inboundQueues[0].pop());
	        }
	        if (this._outboundQueue.length === 0) {
	            this._recordBatcher.flushBatch();
	        }
	        this._sendRequest(this._outboundQueue.pop(), 0, isTeardown);
	    };
	    AWTTransmissionManager._retryRequestIfNeeded = function (conn, request, tokenCount, apikey, retryCount) {
	        var _this = this;
	        var shouldRetry = true;
	        if (conn && typeof conn.status !== 'undefined') {
	            var killedTokens = this._killSwitch.setKillSwitchTenants(conn.getResponseHeader('kill-tokens'), conn.getResponseHeader('kill-duration-seconds'));
	            killedTokens.forEach(function (key) {
	                delete request[key];
	                tokenCount--;
	            });
	            if (!AWTRetryPolicy_1.default.shouldRetryForStatus(conn.status) || tokenCount <= 0) {
	                shouldRetry = false;
	            }
	        }
	        if (shouldRetry && retryCount < MaxRetries) {
	            setTimeout(function () { return _this._sendRequest(request, retryCount + 1, false); }, AWTRetryPolicy_1.default.getMillisToBackoffForRetry(retryCount));
	        }
	        else {
	            this._handleRequestFinished(null);
	        }
	    };
	    AWTTransmissionManager._sendRequest = function (request, retryCount, isTeardown) {
	        var _this = this;
	        var conn = new XMLHttpRequest();
	        var tokenCount = 0;
	        var apikey = '';
	        Object.keys(request).forEach(function (token) {
	            if (!_this._killSwitch.isTenantKilled(token)) {
	                if (apikey.length > 0) {
	                    apikey += ',';
	                }
	                apikey += token;
	                tokenCount++;
	            }
	            else {
	                delete request[token];
	            }
	        });
	        conn.open('POST', this._urlString + apikey, !isTeardown);
	        if (!isTeardown) {
	            conn.ontimeout = function () {
	                _this._retryRequestIfNeeded(conn, request, tokenCount, apikey, retryCount);
	            };
	            conn.onerror = function () {
	                _this._retryRequestIfNeeded(conn, request, tokenCount, apikey, retryCount);
	            };
	            conn.onload = function () {
	                _this._handleRequestFinished(conn);
	            };
	        }
	        if (tokenCount > 0) {
	            var blob = AWTBondSerializer_1.default.getPayloadBlob(request, tokenCount);
	            if (typeof Uint8Array === 'undefined') {
	                conn.send(AWTBondSerializer_1.default.base64Encode(blob));
	            }
	            else {
	                conn.send(new Uint8Array(blob));
	            }
	        }
	        else if (isTeardown) {
	            this._handleRequestFinished(null);
	        }
	    };
	    AWTTransmissionManager._handleRequestFinished = function (conn) {
	        var _this = this;
	        if (conn) {
	            this._killSwitch.setKillSwitchTenants(conn.getResponseHeader('kill-tokens'), conn.getResponseHeader('kill-duration-seconds'));
	        }
	        if (this._inboundQueues[0].length > 0) {
	            this._timeout = setTimeout(function () { return _this._batchAndSendEvents(false); }, this._sendingTimer);
	        }
	        else {
	            this._timeout = -1;
	            this._running = false;
	        }
	    };
	    AWTTransmissionManager._flush = function (callback) {
	        var _this = this;
	        if (!this._running) {
	            if (this._timeout > -1) {
	                clearTimeout(this._timeout);
	                this._timeout = -1;
	            }
	            if (this._inboundQueues[0].length > 0) {
	                this._batchAndSendEvents(false);
	            }
	        }
	        this._checkPrimaryInboundQueueEmpty(function () {
	            //Move the next queue to be primary
	            _this._inboundQueues.shift();
	            if (callback !== null && callback !== undefined) {
	                callback();
	            }
	            if (_this._flushQueue.length > 0) {
	                setTimeout(function () { return _this._flush(_this._flushQueue.shift()); }, _this._sendingTimer);
	            }
	            else {
	                _this._isCurrentlyFlushing = false;
	                if (_this._inboundQueues[0].length > 0) {
	                    _this._timeout = setTimeout(function () { return _this._batchAndSendEvents(false); }, _this._sendingTimer);
	                }
	            }
	        });
	    };
	    AWTTransmissionManager._checkPrimaryInboundQueueEmpty = function (callback) {
	        var _this = this;
	        if (this._inboundQueues[0].length === 0) {
	            this._checkOutboundQueueEmptyAndSent(callback);
	        }
	        else {
	            setTimeout(function () { return _this._checkPrimaryInboundQueueEmpty(callback); }, FlushCheckTimer);
	        }
	    };
	    AWTTransmissionManager._checkOutboundQueueEmptyAndSent = function (callback) {
	        var _this = this;
	        if (!this._running) {
	            callback();
	        }
	        else {
	            setTimeout(function () { return _this._checkOutboundQueueEmptyAndSent(callback); }, FlushCheckTimer);
	        }
	    };
	    return AWTTransmissionManager;
	}());
	AWTTransmissionManager._outboundQueue = [];
	AWTTransmissionManager._inboundQueues = [];
	AWTTransmissionManager._newEventsAllowed = false;
	AWTTransmissionManager._killSwitch = new AWTKillSwitch_1.default();
	AWTTransmissionManager._isCurrentlyFlushing = false;
	AWTTransmissionManager._flushQueue = [];
	AWTTransmissionManager._running = false;
	AWTTransmissionManager._timeout = -1;
	AWTTransmissionManager._urlString = '?qsp=true&content-type=application%2Fbond-compact-binary&client-id=NO_AUTH&sdk-version='
	    + Version.FullVersionString;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AWTTransmissionManager;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AWTBondSerializer_1 = __webpack_require__(6);
	var AWTRecordBatcher = (function () {
	    function AWTRecordBatcher(_maxRequestSize, _outboundQueue) {
	        this._maxRequestSize = _maxRequestSize;
	        this._outboundQueue = _outboundQueue;
	        this._currentBatch = {};
	        this._currentBatchSize = 0;
	    }
	    AWTRecordBatcher.prototype.addEventToBatch = function (event) {
	        var serializedEvent = AWTBondSerializer_1.default.getEventBlob(event);
	        if (serializedEvent.length > this._maxRequestSize) {
	            //single event too big
	            return;
	        }
	        if (this._currentBatchSize + serializedEvent.length > this._maxRequestSize) {
	            this.flushBatch();
	        }
	        else {
	            if (this._currentBatch[event.tenantToken] === undefined) {
	                this._currentBatch[event.tenantToken] = [];
	            }
	            this._currentBatch[event.tenantToken].push(serializedEvent);
	            this._currentBatchSize += serializedEvent.length;
	        }
	    };
	    AWTRecordBatcher.prototype.flushBatch = function () {
	        if (this._currentBatchSize > 0) {
	            this._outboundQueue.push(this._currentBatch);
	            this._currentBatch = {};
	            this._currentBatchSize = 0;
	        }
	    };
	    return AWTRecordBatcher;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AWTRecordBatcher;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* AWTBondSerializer.ts
	* Author: Brent Erickson (brericks) and Abhilash Panwar (abpanwar)
	* Copyright: Microsoft 2016
	* Class to handler bond serialization.
	*/
	"use strict";
	var Bond = __webpack_require__(7);
	var Enums_1 = __webpack_require__(2);
	var Utils = __webpack_require__(12);
	var AWTBondSerializer = (function () {
	    function AWTBondSerializer() {
	    }
	    AWTBondSerializer.getPayloadBlob = function (requestDictionary, tokenCount) {
	        var stream = new Bond.IO.MemoryStream();
	        var writer = new Bond.CompactBinaryProtocolWriter(stream);
	        // Begin ClientCollector request
	        //Write TokenToDataPackagesMap
	        writer.WriteFieldBegin(Bond.BondDataType.BT_MAP, 3);
	        writer.WriteMapContainerBegin(tokenCount, Bond.BondDataType.BT_STRING, Bond.BondDataType.BT_LIST);
	        Object.keys(requestDictionary).forEach(function (token) {
	            //write token
	            writer.WriteString(token);
	            var dataPackage = requestDictionary[token];
	            // Write list of DataPackages
	            writer.WriteContainerBegin(1, Bond.BondDataType.BT_STRUCT);
	            // Source
	            writer.WriteFieldBegin(Bond.BondDataType.BT_STRING, 2);
	            writer.WriteString('act_default_source');
	            // DataPackageId
	            writer.WriteFieldBegin(Bond.BondDataType.BT_STRING, 5);
	            writer.WriteString(Utils.newGuid());
	            // Timestamp
	            writer.WriteFieldBegin(Bond.BondDataType.BT_INT64, 6);
	            writer.WriteInt64(Utils.numberToBondInt64(Date.now()));
	            // Records
	            writer.WriteFieldBegin(Bond.BondDataType.BT_LIST, 8);
	            writer.WriteContainerBegin(dataPackage.length, Bond.BondDataType.BT_STRUCT);
	            for (var i = 0; i < dataPackage.length; ++i) {
	                writer.WriteBlob(dataPackage[i]);
	            }
	            writer.WriteStructEnd(false);
	        });
	        // End ClientCollector
	        writer.WriteStructEnd(false);
	        return stream.GetBuffer();
	    };
	    // As per mappings at https://skype.visualstudio.com/SCC/F.S4L.FUNDAMENTALS/_git/infrastructure_data_clienttelemetry?
	    // path=%2Fclienttelemetry%2Fsrc%2Fbond%2FDataPackage.bond&version=GBdev2&_a=contents
	    // Requires that the values of AWTEventData.properties must all be AWTEventProperty
	    AWTBondSerializer.getEventBlob = function (eventData) {
	        var stream = new Bond.IO.MemoryStream();
	        var writer = new Bond.CompactBinaryProtocolWriter(stream);
	        // ID
	        writer.WriteFieldBegin(Bond.BondDataType.BT_STRING, 1);
	        writer.WriteString(eventData.id);
	        // Timestamp
	        writer.WriteFieldBegin(Bond.BondDataType.BT_INT64, 3);
	        writer.WriteInt64(Utils.numberToBondInt64(eventData.timestamp));
	        // Type
	        writer.WriteFieldBegin(Bond.BondDataType.BT_STRING, 5);
	        writer.WriteString(eventData.type);
	        // Event Type
	        writer.WriteFieldBegin(Bond.BondDataType.BT_STRING, 6);
	        writer.WriteString(eventData.name);
	        var propsString = [];
	        var piiProps = [];
	        // Iterate across event data properties and separate based on pii
	        Object.keys(eventData.properties).forEach(function (key) {
	            var property = eventData.properties[key];
	            if (property.pii === Enums_1.AWTPiiKind.NotSet) {
	                propsString.push(key);
	            }
	            else {
	                piiProps.push(key);
	            }
	        });
	        //Extension map
	        if (propsString.length) {
	            writer.WriteFieldBegin(Bond.BondDataType.BT_MAP, 13);
	            writer.WriteMapContainerBegin(propsString.length, Bond.BondDataType.BT_STRING, Bond.BondDataType.BT_STRING);
	            propsString.forEach(function (name) {
	                writer.WriteString(name);
	                writer.WriteString(eventData.properties[name].value);
	            });
	        }
	        // Pii
	        if (piiProps.length) {
	            writer.WriteFieldBegin(Bond.BondDataType.BT_MAP, 30);
	            writer.WriteMapContainerBegin(piiProps.length, Bond.BondDataType.BT_STRING, Bond.BondDataType.BT_STRUCT);
	            piiProps.forEach(function (name) {
	                writer.WriteString(name);
	                // PII Data
	                // O365 scrubber type
	                writer.WriteFieldBegin(Bond.BondDataType.BT_INT32, 1);
	                writer.WriteInt32(1);
	                // PII Kind
	                writer.WriteFieldBegin(Bond.BondDataType.BT_INT32, 2);
	                writer.WriteInt32(eventData.properties[name].pii);
	                // Value
	                writer.WriteFieldBegin(Bond.BondDataType.BT_STRING, 3);
	                writer.WriteString(eventData.properties[name].value);
	                writer.WriteStructEnd(false);
	            });
	        }
	        writer.WriteStructEnd(false);
	        return stream.GetBuffer();
	    };
	    AWTBondSerializer.base64Encode = function (data) {
	        return Bond.Encoding.Base64.GetString(data);
	    };
	    return AWTBondSerializer;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AWTBondSerializer;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* microsoft.bond.ts
	* Copyright: Microsoft 2016
	*/
	"use strict";
	var bond_const_1 = __webpack_require__(8);
	exports.BondDataType = bond_const_1.BondDataType;
	var Encoding = __webpack_require__(9);
	exports.Encoding = Encoding;
	var IO = __webpack_require__(11);
	exports.IO = IO;
	var microsoft_bond_primitives_1 = __webpack_require__(10);
	exports.Int64 = microsoft_bond_primitives_1.Int64;
	exports.UInt64 = microsoft_bond_primitives_1.UInt64;
	exports.Number = microsoft_bond_primitives_1.Number;
	var CompactBinaryProtocolWriter = (function () {
	    function CompactBinaryProtocolWriter(stream) {
	        this._stream = stream;
	    }
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteBlob = function (blob) {
	        this._stream.Write(blob, 0, blob.length);
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteContainerBegin = function (size, elementType) {
	        this.WriteUInt8(elementType);
	        this.WriteUInt32(size);
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteMapContainerBegin = function (size, keyType, valueType) {
	        this.WriteUInt8(keyType);
	        this.WriteUInt8(valueType);
	        this.WriteUInt32(size);
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteFieldBegin = function (type, id) {
	        if (id <= 5) {
	            this._stream.WriteByte(type | (id << 5));
	        }
	        else if (id <= 0xff) {
	            this._stream.WriteByte(type | (6 << 5));
	            this._stream.WriteByte(id);
	        }
	        else {
	            this._stream.WriteByte(type | (7 << 5));
	            this._stream.WriteByte(id);
	            this._stream.WriteByte(id >> 8);
	        }
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteInt32 = function (value) {
	        value = Encoding.Zigzag.EncodeZigzag32(value);
	        this.WriteUInt32(value);
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteInt64 = function (value) {
	        this.WriteUInt64(Encoding.Zigzag.EncodeZigzag64(value));
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteString = function (value) {
	        if (value === '') {
	            this.WriteUInt32(0 /*length*/);
	        }
	        else {
	            var array = Encoding.Utf8.GetBytes(value);
	            this.WriteUInt32(array.length);
	            this._stream.Write(array, 0, array.length);
	        }
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteStructEnd = function (isBase) {
	        this.WriteUInt8(isBase ? bond_const_1.BondDataType.BT_STOP_BASE : bond_const_1.BondDataType.BT_STOP);
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteUInt32 = function (value) {
	        var array = Encoding.Varint.GetBytes(microsoft_bond_primitives_1.Number.ToUInt32(value));
	        this._stream.Write(array, 0, array.length);
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteUInt64 = function (value) {
	        var array = Encoding.Varint64.GetBytes(value);
	        this._stream.Write(array, 0, array.length);
	    };
	    /*override*/
	    CompactBinaryProtocolWriter.prototype.WriteUInt8 = function (value) {
	        this._stream.WriteByte(microsoft_bond_primitives_1.Number.ToUInt8(value));
	    };
	    return CompactBinaryProtocolWriter;
	}());
	exports.CompactBinaryProtocolWriter = CompactBinaryProtocolWriter;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	* bond_const.ts
	* Copyright: Microsoft 2016
	*/
	"use strict";
	//------------------------------------------------------------------------------
	// <auto-generated>
	//     This code was generated by a tool.
	//
	//     Tool     : bondc, Version=3.0.1, Build=bond-git.debug.not
	//     Template : Microsoft.Bond.Rules.dll#TypeScript.tt
	//     File     : bond_const.ts
	//
	//     Changes to this file may cause incorrect behavior and will be lost when
	//     the code is regenerated.
	// </auto-generated>
	//------------------------------------------------------------------------------
	var BondDataType;
	(function (BondDataType) {
	    BondDataType[BondDataType["BT_STOP"] = 0] = "BT_STOP";
	    BondDataType[BondDataType["BT_STOP_BASE"] = 1] = "BT_STOP_BASE";
	    BondDataType[BondDataType["BT_UINT8"] = 3] = "BT_UINT8";
	    BondDataType[BondDataType["BT_UINT32"] = 5] = "BT_UINT32";
	    BondDataType[BondDataType["BT_UINT64"] = 6] = "BT_UINT64";
	    BondDataType[BondDataType["BT_STRING"] = 9] = "BT_STRING";
	    BondDataType[BondDataType["BT_STRUCT"] = 10] = "BT_STRUCT";
	    BondDataType[BondDataType["BT_LIST"] = 11] = "BT_LIST";
	    BondDataType[BondDataType["BT_MAP"] = 13] = "BT_MAP";
	    BondDataType[BondDataType["BT_INT32"] = 16] = "BT_INT32";
	    BondDataType[BondDataType["BT_INT64"] = 17] = "BT_INT64";
	    BondDataType[BondDataType["BT_UNAVAILABLE"] = 127] = "BT_UNAVAILABLE";
	})(BondDataType = exports.BondDataType || (exports.BondDataType = {}));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* microsoft.bond.encoding.ts
	* Copyright: Microsoft 2016
	*/
	"use strict";
	var microsoft_bond_primitives_1 = __webpack_require__(10);
	var Utf8 = (function () {
	    function Utf8() {
	    }
	    Utf8.GetBytes = function (value) {
	        var array = [];
	        for (var i = 0; i < value.length; ++i) {
	            var char = value.charCodeAt(i);
	            if (char < 0x80) {
	                array.push(char);
	            }
	            else if (char < 0x800) {
	                array.push(0xc0 | (char >> 6), 0x80 | (char & 0x3f));
	            }
	            else if (char < 0xd800 || char >= 0xe000) {
	                array.push(0xe0 | (char >> 12), 0x80 | ((char >> 6) & 0x3f), 0x80 | (char & 0x3f));
	            }
	            else {
	                char = 0x10000 + (((char & 0x3ff) << 10) | (value.charCodeAt(++i) & 0x3ff));
	                array.push(0xf0 | (char >> 18), 0x80 | ((char >> 12) & 0x3f), 0x80 | ((char >> 6) & 0x3f), 0x80 | (char & 0x3f));
	            }
	        }
	        return array;
	    };
	    return Utf8;
	}());
	exports.Utf8 = Utf8;
	var Base64 = (function () {
	    function Base64() {
	    }
	    Base64.GetString = function (inArray) {
	        var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	        var output = [];
	        var paddingBytes = inArray.length % 3;
	        var toBase64 = function (num) {
	            return [lookup.charAt((num >> 18) & 0x3F),
	                lookup.charAt((num >> 12) & 0x3F),
	                lookup.charAt((num >> 6) & 0x3F),
	                lookup.charAt(num & 0x3F)].join('');
	        };
	        for (var i = 0, length_1 = inArray.length - paddingBytes; i < length_1; i += 3) {
	            var temp = (inArray[i] << 16) + (inArray[i + 1] << 8) + (inArray[i + 2]);
	            output.push(toBase64(temp));
	        }
	        switch (paddingBytes) {
	            case 1:
	                var temp = inArray[inArray.length - 1];
	                output.push(lookup.charAt(temp >> 2));
	                output.push(lookup.charAt((temp << 4) & 0x3F));
	                output.push('==');
	                break;
	            case 2:
	                var temp2 = (inArray[inArray.length - 2] << 8) + (inArray[inArray.length - 1]);
	                output.push(lookup.charAt(temp2 >> 10));
	                output.push(lookup.charAt((temp2 >> 4) & 0x3F));
	                output.push(lookup.charAt((temp2 << 2) & 0x3F));
	                output.push('=');
	                break;
	        }
	        return output.join('');
	    };
	    return Base64;
	}());
	exports.Base64 = Base64;
	var Varint = (function () {
	    function Varint() {
	    }
	    Varint.GetBytes = function (value) {
	        var array = [];
	        while (value & 0xffffff80) {
	            array.push((value & 0x7f) | 0x80);
	            value >>>= 7;
	        }
	        array.push(value & 0x7f);
	        return array;
	    };
	    return Varint;
	}());
	exports.Varint = Varint;
	var Varint64 = (function () {
	    function Varint64() {
	    }
	    Varint64.GetBytes = function (value) {
	        var low = value.low;
	        var high = value.high;
	        var array = [];
	        while (high || (0xffffff80 & low)) {
	            array.push((low & 0x7f) | 0x80);
	            low = ((high & 0x7f) << 25) | (low >>> 7);
	            high >>>= 7;
	        }
	        array.push(low & 0x7f);
	        return array;
	    };
	    return Varint64;
	}());
	exports.Varint64 = Varint64;
	var Zigzag = (function () {
	    function Zigzag() {
	    }
	    Zigzag.EncodeZigzag32 = function (value) {
	        value = microsoft_bond_primitives_1.Number.ToInt32(value);
	        return ((value << 1) ^ (value >> (4 /*sizeof(int)*/ * 8 - 1)));
	    };
	    Zigzag.EncodeZigzag64 = function (value) {
	        var low = value.low;
	        var high = value.high;
	        var tmpH = (high << 1) | (low >>> 31);
	        var tmpL = low << 1;
	        if (high & 0x80000000) {
	            tmpH = ~tmpH;
	            tmpL = ~tmpL;
	        }
	        var res = new microsoft_bond_primitives_1.UInt64('0');
	        res.low = tmpL;
	        res.high = tmpH;
	        return res;
	    };
	    return Zigzag;
	}());
	exports.Zigzag = Zigzag;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	* microsoft.bond.primitives.ts
	* Copyright: Microsoft 2016
	*/
	"use strict";
	var Int64 = (function () {
	    // BUG!!: need implement, currently, just handle 32bits number
	    function Int64(numberStr) {
	        this.low = 0;
	        this.high = 0;
	        this.low = parseInt(numberStr, 10);
	        if (this.low < 0) {
	            this.high = -1;
	        }
	    }
	    Int64.prototype.Equals = function (numberStr) {
	        var tmp = new Int64(numberStr);
	        return this.low === tmp.low && this.high === tmp.high;
	    };
	    return Int64;
	}());
	exports.Int64 = Int64;
	var UInt64 = (function () {
	    // BUG!!: need implement, currently, just handle 32bits number
	    function UInt64(numberStr) {
	        this.low = 0;
	        this.high = 0;
	        this.low = parseInt(numberStr, 10);
	    }
	    UInt64.prototype.Equals = function (numberStr) {
	        var tmp = new UInt64(numberStr);
	        return this.low === tmp.low && this.high === tmp.high;
	    };
	    return UInt64;
	}());
	exports.UInt64 = UInt64;
	var Number = (function () {
	    function Number() {
	    }
	    Number.ToByte = function (value) {
	        return this.ToUInt8(value);
	    };
	    Number.ToInt16 = function (value) {
	        var signMask = (value & 0x8000) << 16 >> 16;
	        return (value & 0x7fff) | signMask;
	    };
	    Number.ToInt32 = function (value) {
	        var signMask = (value & 0x80000000);
	        return (value & 0x7fffffff) | signMask;
	    };
	    Number.ToUInt8 = function (value) {
	        return value & 0xff;
	    };
	    Number.ToUInt32 = function (value) {
	        return value & 0xffffffff;
	    };
	    return Number;
	}());
	exports.Number = Number;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* microsoft.bond.io.ts
	* Copyright: Microsoft 2016
	*/
	"use strict";
	var microsoft_bond_primitives_1 = __webpack_require__(10);
	var MemoryStream = (function () {
	    function MemoryStream() {
	        this._buffer = [];
	    }
	    /*override*/
	    MemoryStream.prototype.WriteByte = function (byte) {
	        this._buffer.push(microsoft_bond_primitives_1.Number.ToByte(byte));
	    };
	    /*override*/
	    MemoryStream.prototype.Write = function (buffer, offset, count) {
	        while (count--) {
	            this.WriteByte(buffer[offset++]);
	        }
	    };
	    /**
	     * Returns the array of unsigned bytes from which this stream was created.
	     */
	    MemoryStream.prototype.GetBuffer = function () {
	        return this._buffer;
	    };
	    return MemoryStream;
	}());
	exports.MemoryStream = MemoryStream;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	* Utils.ts
	* Author: Brent Erickson (brericks) and Abhilash Panwar (abpanwar)
	* Copyright: Microsoft 2016
	* Common functions used in the SDK.
	*/
	var microsoft_bond_primitives_1 = __webpack_require__(10);
	var GuidRegex = /[xy]/g;
	function numberToBondInt64(value) {
	    // Construct bond timestamp for aria
	    var bond_value = new microsoft_bond_primitives_1.Int64('0');
	    bond_value.low = value & 0xffffffff;
	    bond_value.high = Math.floor(value / 0x100000000);
	    return bond_value;
	}
	exports.numberToBondInt64 = numberToBondInt64;
	function newGuid() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(GuidRegex, function (c) {
	        var r = (Math.random() * 16 | 0), v = (c === 'x' ? r : r & 0x3 | 0x8);
	        return v.toString(16);
	    });
	}
	exports.newGuid = newGuid;
	function isPii(value) {
	    if (!isNaN(value) && value !== null && value >= 0 && value <= 13) {
	        return true;
	    }
	    return false;
	}
	exports.isPii = isPii;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	/**
	* AWTRetryPolicy.ts
	* Author: Abhilash Panwar (abpanwar)
	* Copyright: Microsoft 2016
	* Class for retry policy.
	*/
	var RandomizationLowerThreshold = 0.8;
	var RandomizationUpperThreshold = 1.2;
	var BaseBackoff = 3000;
	var MaxBackoff = 120000;
	var AWTRetryPolicy = (function () {
	    function AWTRetryPolicy() {
	    }
	    AWTRetryPolicy.shouldRetryForStatus = function (httpStatusCode) {
	        /* The below expression reads that we should only retry for:
	            - HttpStatusCodes that are smaller than 300.
	            - HttpStatusCodes greater or equal to 500 (except for 501-NotImplement
	              and 505-HttpVersionNotSupport).
	            - HttpStatusCode 408-RequestTimeout.
	           This is based on Microsoft.WindowsAzure.Storage.RetryPolicies.ExponentialRetry class */
	        return !((httpStatusCode >= 300 && httpStatusCode < 500 && httpStatusCode !== 408)
	            || (httpStatusCode === 501)
	            || (httpStatusCode === 505));
	    };
	    AWTRetryPolicy.getMillisToBackoffForRetry = function (retriesSoFar) {
	        var waitDuration = 0;
	        var minBackoff = BaseBackoff * RandomizationLowerThreshold;
	        var maxBackoff = BaseBackoff * RandomizationUpperThreshold;
	        var randomBackoff = Math.floor(Math.random() * (maxBackoff - minBackoff)) + minBackoff;
	        waitDuration = Math.pow(4, retriesSoFar) * randomBackoff;
	        return Math.min(waitDuration, MaxBackoff);
	    };
	    return AWTRetryPolicy;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AWTRetryPolicy;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var SecToMsMultiplier = 1000;
	var AWTKillSwitch = (function () {
	    function AWTKillSwitch() {
	        this._killedTokenDictionary = {};
	    }
	    AWTKillSwitch.prototype.setKillSwitchTenants = function (killTokens, killDuration) {
	        var _this = this;
	        if (killTokens && killDuration) {
	            try {
	                var killedTokens = killTokens.split(',');
	                if (killDuration === 'this-request-only') {
	                    return killedTokens;
	                }
	                var durationMs_1 = parseInt(killDuration, 10) * SecToMsMultiplier;
	                killedTokens.forEach(function (token) {
	                    _this._killedTokenDictionary[token] = Date.now() + durationMs_1;
	                });
	            }
	            catch (ex) {
	                return [];
	            }
	        }
	        return [];
	    };
	    AWTKillSwitch.prototype.isTenantKilled = function (tenantToken) {
	        if (this._killedTokenDictionary[tenantToken] !== undefined && this._killedTokenDictionary[tenantToken] > Date.now()) {
	            return true;
	        }
	        delete this._killedTokenDictionary[tenantToken];
	        return false;
	    };
	    return AWTKillSwitch;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AWTKillSwitch;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	/**
	* Version.ts
	* Author: Abhilash Panwar (abpanwar)
	* Copyright: Microsoft 2016
	* Class for SDK version.
	*/
	exports.Version = '1.2.0';
	exports.FullVersionString = 'AWT-Web-CJS-' + exports.Version;


/***/ }
/******/ ])
});
;

},{}],89:[function(require,module,exports){
(function (global){
/*
  html2canvas 0.5.0-beta3 <http://html2canvas.hertzen.com>
  Copyright (c) 2016 Niklas von Hertzen

  Released under  License
*/
var Promise = require('es6-promise').Promise;

!function(e) {window.OfficeBrowserFeedback.html2canvas = e}(function () {var define, module, exports;return (function e(t, n, r) {function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++) s(r[o]); return s})({1: [function (_dereq_, module, exports) {
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

    /** Detect free variables */
    var freeExports = typeof exports == 'object' && exports;
    var freeModule = typeof module == 'object' && module &&
        module.exports == freeExports && module;
    var freeGlobal = typeof global == 'object' && global;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
        root = freeGlobal;
    }

    /**
     * The `punycode` object.
     * @name punycode
     * @type Object
     */
    var punycode,

    /** Highest positive signed 32-bit float value */
    maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

    /** Bootstring parameters */
    base = 36,
    tMin = 1,
    tMax = 26,
    skew = 38,
    damp = 700,
    initialBias = 72,
    initialN = 128, // 0x80
    delimiter = '-', // '\x2D'

    /** Regular expressions */
    regexPunycode = /^xn--/,
    regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
    regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

    /** Error messages */
    errors = {
        'overflow': 'Overflow: input needs wider integers to process',
        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
        'invalid-input': 'Invalid input'
    },

    /** Convenience shortcuts */
    baseMinusTMin = base - tMin,
    floor = Math.floor,
    stringFromCharCode = String.fromCharCode,

    /** Temporary variable */
    key;

    /*--------------------------------------------------------------------------*/

    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
    function error(type) {
        throw RangeError(errors[type]);
    }

    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */
    function map(array, fn) {
        var length = array.length;
        while (length--) {
            array[length] = fn(array[length]);
        }
        return array;
    }

    /**
     * A simple `Array#map`-like wrapper to work with domain name strings.
     * @private
     * @param {String} domain The domain name.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {Array} A new string of characters returned by the callback
     * function.
     */
    function mapDomain(string, fn) {
        return map(string.split(regexSeparators), fn).join('.');
    }

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <http://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
    function ucs2decode(string) {
        var output = [],
            counter = 0,
            length = string.length,
            value,
            extra;
        while (counter < length) {
            value = string.charCodeAt(counter++);
            if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                // high surrogate, and there is a next character
                extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                    output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                } else {
                    // unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value);
                    counter--;
                }
            } else {
                output.push(value);
            }
        }
        return output;
    }

    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */
    function ucs2encode(array) {
        return map(array, function(value) {
            var output = '';
            if (value > 0xFFFF) {
                value -= 0x10000;
                output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                value = 0xDC00 | value & 0x3FF;
            }
            output += stringFromCharCode(value);
            return output;
        }).join('');
    }

    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
    function basicToDigit(codePoint) {
        if (codePoint - 48 < 10) {
            return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
            return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
            return codePoint - 97;
        }
        return base;
    }

    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
    function digitToBasic(digit, flag) {
        //  0..25 map to ASCII a..z or A..Z
        // 26..35 map to ASCII 0..9
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * http://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
    function adapt(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
            delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }

    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
    function decode(input) {
        // Don't use UCS-2
        var output = [],
            inputLength = input.length,
            out,
            i = 0,
            n = initialN,
            bias = initialBias,
            basic,
            j,
            index,
            oldi,
            w,
            k,
            digit,
            t,
            /** Cached calculation results */
            baseMinusT;

        // Handle the basic code points: let `basic` be the number of input code
        // points before the last delimiter, or `0` if there is none, then copy
        // the first basic code points to the output.

        basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
            basic = 0;
        }

        for (j = 0; j < basic; ++j) {
            // if it's not a basic code point
            if (input.charCodeAt(j) >= 0x80) {
                error('not-basic');
            }
            output.push(input.charCodeAt(j));
        }

        // Main decoding loop: start just after the last delimiter if any basic code
        // points were copied; start at the beginning otherwise.

        for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

            // `index` is the index of the next character to be consumed.
            // Decode a generalized variable-length integer into `delta`,
            // which gets added to `i`. The overflow checking is easier
            // if we increase `i` as we go, then subtract off its starting
            // value at the end to obtain `delta`.
            for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

                if (index >= inputLength) {
                    error('invalid-input');
                }

                digit = basicToDigit(input.charCodeAt(index++));

                if (digit >= base || digit > floor((maxInt - i) / w)) {
                    error('overflow');
                }

                i += digit * w;
                t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

                if (digit < t) {
                    break;
                }

                baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) {
                    error('overflow');
                }

                w *= baseMinusT;

            }

            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi == 0);

            // `i` was supposed to wrap around from `out` to `0`,
            // incrementing `n` each time, so we'll fix that now:
            if (floor(i / out) > maxInt - n) {
                error('overflow');
            }

            n += floor(i / out);
            i %= out;

            // Insert `n` at position `i` of the output
            output.splice(i++, 0, n);

        }

        return ucs2encode(output);
    }

    /**
     * Converts a string of Unicode symbols to a Punycode string of ASCII-only
     * symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
    function encode(input) {
        var n,
            delta,
            handledCPCount,
            basicLength,
            bias,
            j,
            m,
            q,
            k,
            t,
            currentValue,
            output = [],
            /** `inputLength` will hold the number of code points in `input`. */
            inputLength,
            /** Cached calculation results */
            handledCPCountPlusOne,
            baseMinusT,
            qMinusT;

        // Convert the input in UCS-2 to Unicode
        input = ucs2decode(input);

        // Cache the length
        inputLength = input.length;

        // Initialize the state
        n = initialN;
        delta = 0;
        bias = initialBias;

        // Handle the basic code points
        for (j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue < 0x80) {
                output.push(stringFromCharCode(currentValue));
            }
        }

        handledCPCount = basicLength = output.length;

        // `handledCPCount` is the number of code points that have been handled;
        // `basicLength` is the number of basic code points.

        // Finish the basic string - if it is not empty - with a delimiter
        if (basicLength) {
            output.push(delimiter);
        }

        // Main encoding loop:
        while (handledCPCount < inputLength) {

            // All non-basic code points < n have been handled already. Find the next
            // larger one:
            for (m = maxInt, j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue >= n && currentValue < m) {
                    m = currentValue;
                }
            }

            // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
            // but guard against overflow
            handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                error('overflow');
            }

            delta += (m - n) * handledCPCountPlusOne;
            n = m;

            for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];

                if (currentValue < n && ++delta > maxInt) {
                    error('overflow');
                }

                if (currentValue == n) {
                    // Represent delta as a generalized variable-length integer
                    for (q = delta, k = base; /* no condition */; k += base) {
                        t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                        if (q < t) {
                            break;
                        }
                        qMinusT = q - t;
                        baseMinusT = base - t;
                        output.push(
                            stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                        );
                        q = floor(qMinusT / baseMinusT);
                    }

                    output.push(stringFromCharCode(digitToBasic(q, 0)));
                    bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                    delta = 0;
                    ++handledCPCount;
                }
            }

            ++delta;
            ++n;

        }
        return output.join('');
    }

    /**
     * Converts a Punycode string representing a domain name to Unicode. Only the
     * Punycoded parts of the domain name will be converted, i.e. it doesn't
     * matter if you call it on a string that has already been converted to
     * Unicode.
     * @memberOf punycode
     * @param {String} domain The Punycode domain name to convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */
    function toUnicode(domain) {
        return mapDomain(domain, function(string) {
            return regexPunycode.test(string)
                ? decode(string.slice(4).toLowerCase())
                : string;
        });
    }

    /**
     * Converts a Unicode string representing a domain name to Punycode. Only the
     * non-ASCII parts of the domain name will be converted, i.e. it doesn't
     * matter if you call it with a domain that's already in ASCII.
     * @memberOf punycode
     * @param {String} domain The domain name to convert, as a Unicode string.
     * @returns {String} The Punycode representation of the given domain name.
     */
    function toASCII(domain) {
        return mapDomain(domain, function(string) {
            return regexNonASCII.test(string)
                ? 'xn--' + encode(string)
                : string;
        });
    }

    /*--------------------------------------------------------------------------*/

    /** Define the public API */
    punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        'version': '1.2.4',
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <http://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        'ucs2': {
            'decode': ucs2decode,
            'encode': ucs2encode
        },
        'decode': decode,
        'encode': encode,
        'toASCII': toASCII,
        'toUnicode': toUnicode
    };

    /** Expose `punycode` */
    // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
    if (
        typeof define == 'function' &&
        typeof define.amd == 'object' &&
        define.amd
    ) {
        define('punycode', function() {
            return punycode;
        });
    } else if (freeExports && !freeExports.nodeType) {
        if (freeModule) { // in Node.js or RingoJS v0.8.0+
            freeModule.exports = punycode;
        } else { // in Narwhal or RingoJS v0.7.0-
            for (key in punycode) {
                punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
            }
        }
    } else { // in Rhino or a web browser
        root.punycode = punycode;
    }

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
var log = _dereq_('./log');

function restoreOwnerScroll(ownerDocument, x, y) {
    if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
        ownerDocument.defaultView.scrollTo(x, y);
    }
}

function cloneCanvasContents(canvas, clonedCanvas) {
    try {
        if (clonedCanvas) {
            clonedCanvas.width = canvas.width;
            clonedCanvas.height = canvas.height;
            clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
        }
    } catch(e) {
        log("Unable to copy canvas content from", canvas, e);
    }
}

function cloneNode(node, javascriptEnabled) {
    var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

    var child = node.firstChild;
    while(child) {
        if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
            clone.appendChild(cloneNode(child, javascriptEnabled));
        }
        child = child.nextSibling;
    }

    if (node.nodeType === 1) {
        clone._scrollTop = node.scrollTop;
        clone._scrollLeft = node.scrollLeft;
        if (node.nodeName === "CANVAS") {
            cloneCanvasContents(node, clone);
        } else if (node.nodeName === "TEXTAREA" || node.nodeName === "SELECT") {
            clone.value = node.value;
        }
    }

    return clone;
}

function initNode(node) {
    if (node.nodeType === 1) {
        node.scrollTop = node._scrollTop;
        node.scrollLeft = node._scrollLeft;

        var child = node.firstChild;
        while(child) {
            initNode(child);
            child = child.nextSibling;
        }
    }
}

module.exports = function(ownerDocument, containerDocument, width, height, options, x ,y) {
    var documentElement = cloneNode(ownerDocument.documentElement, options.javascriptEnabled);
    var container = containerDocument.createElement("iframe");

    container.className = "html2canvas-container";
    container.style.visibility = "hidden";
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0px";
    container.style.border = "0";
    container.width = width;
    container.height = height;
    container.scrolling = "no"; // ios won't scroll without it
    containerDocument.body.appendChild(container);

    return new Promise(function(resolve) {
        var documentClone = container.contentWindow.document;

        /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
         if window url is about:blank, we can assign the url to current by writing onto the document
         */
        container.contentWindow.onload = container.onload = function() {
            var interval = setInterval(function() {
                if (documentClone.body.childNodes.length > 0) {
                    initNode(documentClone.documentElement);
                    clearInterval(interval);
                    if (options.type === "view") {
                        container.contentWindow.scrollTo(x, y);
                        if ((/(iPad|iPhone|iPod)/g).test(navigator.userAgent) && (container.contentWindow.scrollY !== y || container.contentWindow.scrollX !== x)) {
                            documentClone.documentElement.style.top = (-y) + "px";
                            documentClone.documentElement.style.left = (-x) + "px";
                            documentClone.documentElement.style.position = 'absolute';
                        }
                    }
                    resolve(container);
                }
            }, 50);
        };

        documentClone.open();
        documentClone.write("<!DOCTYPE html><html></html>");
        // Chrome scrolls the parent document for some reason after the write to the cloned window???
        restoreOwnerScroll(ownerDocument, x, y);
        documentClone.replaceChild(documentClone.adoptNode(documentElement), documentClone.documentElement);
        documentClone.close();
    });
};

},{"./log":13}],3:[function(_dereq_,module,exports){
// http://dev.w3.org/csswg/css-color/

function Color(value) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = null;
    var result = this.fromArray(value) ||
        this.namedColor(value) ||
        this.rgb(value) ||
        this.rgba(value) ||
        this.hex6(value) ||
        this.hex3(value);
}

Color.prototype.darken = function(amount) {
    var a = 1 - amount;
    return  new Color([
        Math.round(this.r * a),
        Math.round(this.g * a),
        Math.round(this.b * a),
        this.a
    ]);
};

Color.prototype.isTransparent = function() {
    return this.a === 0;
};

Color.prototype.isBlack = function() {
    return this.r === 0 && this.g === 0 && this.b === 0;
};

Color.prototype.fromArray = function(array) {
    if (Array.isArray(array)) {
        this.r = Math.min(array[0], 255);
        this.g = Math.min(array[1], 255);
        this.b = Math.min(array[2], 255);
        if (array.length > 3) {
            this.a = array[3];
        }
    }

    return (Array.isArray(array));
};

var _hex3 = /^#([a-f0-9]{3})$/i;

Color.prototype.hex3 = function(value) {
    var match = null;
    if ((match = value.match(_hex3)) !== null) {
        this.r = parseInt(match[1][0] + match[1][0], 16);
        this.g = parseInt(match[1][1] + match[1][1], 16);
        this.b = parseInt(match[1][2] + match[1][2], 16);
    }
    return match !== null;
};

var _hex6 = /^#([a-f0-9]{6})$/i;

Color.prototype.hex6 = function(value) {
    var match = null;
    if ((match = value.match(_hex6)) !== null) {
        this.r = parseInt(match[1].substring(0, 2), 16);
        this.g = parseInt(match[1].substring(2, 4), 16);
        this.b = parseInt(match[1].substring(4, 6), 16);
    }
    return match !== null;
};


var _rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

Color.prototype.rgb = function(value) {
    var match = null;
    if ((match = value.match(_rgb)) !== null) {
        this.r = Number(match[1]);
        this.g = Number(match[2]);
        this.b = Number(match[3]);
    }
    return match !== null;
};

var _rgba = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;

Color.prototype.rgba = function(value) {
    var match = null;
    if ((match = value.match(_rgba)) !== null) {
        this.r = Number(match[1]);
        this.g = Number(match[2]);
        this.b = Number(match[3]);
        this.a = Number(match[4]);
    }
    return match !== null;
};

Color.prototype.toString = function() {
    return this.a !== null && this.a !== 1 ?
    "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
    "rgb(" + [this.r, this.g, this.b].join(",") + ")";
};

Color.prototype.namedColor = function(value) {
    value = value.toLowerCase();
    var color = colors[value];
    if (color) {
        this.r = color[0];
        this.g = color[1];
        this.b = color[2];
    } else if (value === "transparent") {
        this.r = this.g = this.b = this.a = 0;
        return true;
    }

    return !!color;
};

Color.prototype.isColor = true;

// JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
var colors = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
};

module.exports = Color;

},{}],4:[function(_dereq_,module,exports){
var Support = _dereq_('./support');
var CanvasRenderer = _dereq_('./renderers/canvas');
var ImageLoader = _dereq_('./imageloader');
var NodeParser = _dereq_('./nodeparser');
var NodeContainer = _dereq_('./nodecontainer');
var log = _dereq_('./log');
var utils = _dereq_('./utils');
var createWindowClone = _dereq_('./clone');
var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;
var getBounds = utils.getBounds;

var html2canvasNodeAttribute = "data-html2canvas-node";
var html2canvasCloneIndex = 0;

function html2canvas(nodeList, options) {
    var index = html2canvasCloneIndex++;
    options = options || {};
    if (options.logging) {
        log.options.logging = true;
        log.options.start = Date.now();
    }

    options.async = typeof(options.async) === "undefined" ? true : options.async;
    options.allowTaint = typeof(options.allowTaint) === "undefined" ? false : options.allowTaint;
    options.removeContainer = typeof(options.removeContainer) === "undefined" ? true : options.removeContainer;
    options.javascriptEnabled = typeof(options.javascriptEnabled) === "undefined" ? false : options.javascriptEnabled;
    options.imageTimeout = typeof(options.imageTimeout) === "undefined" ? 10000 : options.imageTimeout;
    options.renderer = typeof(options.renderer) === "function" ? options.renderer : CanvasRenderer;
    options.strict = !!options.strict;

    if (typeof(nodeList) === "string") {
        if (typeof(options.proxy) !== "string") {
            return Promise.reject("Proxy must be used when rendering url");
        }
        var width = options.width != null ? options.width : window.innerWidth;
        var height = options.height != null ? options.height : window.innerHeight;
        return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function(container) {
            return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
        });
    }

    var node = ((nodeList === undefined) ? [document.documentElement] : ((nodeList.length) ? nodeList : [nodeList]))[0];
    node.setAttribute(html2canvasNodeAttribute + index, index);
    return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
        if (typeof(options.onrendered) === "function") {
            log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
            options.onrendered(canvas);
        }
        return canvas;
    });
}

html2canvas.CanvasRenderer = CanvasRenderer;
html2canvas.NodeContainer = NodeContainer;
html2canvas.log = log;
html2canvas.utils = utils;

var html2canvasExport = (typeof(document) === "undefined" || typeof(Object.create) !== "function" || typeof(document.createElement("canvas").getContext) !== "function") ? function() {
    return Promise.reject("No canvas support");
} : html2canvas;

module.exports = html2canvasExport;

if (typeof(define) === 'function' && define.amd) {
    define('html2canvas', [], function() {
        return html2canvasExport;
    });
}

function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
    return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function(container) {
        log("Document cloned");
        var attributeName = html2canvasNodeAttribute + html2canvasIndex;
        var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
        document.querySelector(selector).removeAttribute(attributeName);
        var clonedWindow = container.contentWindow;
        var node = clonedWindow.document.querySelector(selector);
        var oncloneHandler = (typeof(options.onclone) === "function") ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
        return oncloneHandler.then(function() {
            return renderWindow(node, container, options, windowWidth, windowHeight);
        });
    });
}

function renderWindow(node, container, options, windowWidth, windowHeight) {
    var clonedWindow = container.contentWindow;
    var support = new Support(clonedWindow.document);
    var imageLoader = new ImageLoader(options, support);
    var bounds = getBounds(node);
    var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
    var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
    var renderer = new options.renderer(width, height, imageLoader, options, document);
    var parser = new NodeParser(node, renderer, support, imageLoader, options);
    return parser.ready.then(function() {
        log("Finished rendering");
        var canvas;

        if (options.type === "view") {
            canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
        } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
            canvas = renderer.canvas;
        } else {
            canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: 0, y: 0});
        }

        cleanupContainer(container, options);
        return canvas;
    });
}

function cleanupContainer(container, options) {
    if (options.removeContainer) {
        container.parentNode.removeChild(container);
        log("Cleaned up container");
    }
}

function crop(canvas, bounds) {
    var croppedCanvas = document.createElement("canvas");
    var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
    var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
    var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
    var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
    croppedCanvas.width = bounds.width;
    croppedCanvas.height =  bounds.height;
    var width = x2-x1;
    var height = y2-y1;
    log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", width, "height:", height);
    log("Resulting crop with width", bounds.width, "and height", bounds.height, "with x", x1, "and y", y1);
    croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, bounds.x, bounds.y, width, height);
    return croppedCanvas;
}

function documentWidth (doc) {
    return Math.max(
        Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
        Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
        Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
    );
}

function documentHeight (doc) {
    return Math.max(
        Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
        Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
        Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
    );
}

function absoluteUrl(url) {
    var link = document.createElement("a");
    link.href = url;
    link.href = link.href;
    return link;
}

},{"./clone":2,"./imageloader":11,"./log":13,"./nodecontainer":14,"./nodeparser":15,"./proxy":16,"./renderers/canvas":20,"./support":22,"./utils":26}],5:[function(_dereq_,module,exports){
var log = _dereq_('./log');
var smallImage = _dereq_('./utils').smallImage;

function DummyImageContainer(src) {
    this.src = src;
    log("DummyImageContainer for", src);
    if (!this.promise || !this.image) {
        log("Initiating DummyImageContainer");
        DummyImageContainer.prototype.image = new Image();
        var image = this.image;
        DummyImageContainer.prototype.promise = new Promise(function(resolve, reject) {
            image.onload = resolve;
            image.onerror = reject;
            image.src = smallImage();
            if (image.complete === true) {
                resolve(image);
            }
        });
    }
}

module.exports = DummyImageContainer;

},{"./log":13,"./utils":26}],6:[function(_dereq_,module,exports){
var smallImage = _dereq_('./utils').smallImage;

function Font(family, size) {
    var container = document.createElement('div'),
        img = document.createElement('img'),
        span = document.createElement('span'),
        sampleText = 'Hidden Text',
        baseline,
        middle;

    container.style.visibility = "hidden";
    container.style.fontFamily = family;
    container.style.fontSize = size;
    container.style.margin = 0;
    container.style.padding = 0;

    document.body.appendChild(container);

    img.src = smallImage();
    img.width = 1;
    img.height = 1;

    img.style.margin = 0;
    img.style.padding = 0;
    img.style.verticalAlign = "baseline";

    span.style.fontFamily = family;
    span.style.fontSize = size;
    span.style.margin = 0;
    span.style.padding = 0;

    span.appendChild(document.createTextNode(sampleText));
    container.appendChild(span);
    container.appendChild(img);
    baseline = (img.offsetTop - span.offsetTop) + 1;

    container.removeChild(span);
    container.appendChild(document.createTextNode(sampleText));

    container.style.lineHeight = "normal";
    img.style.verticalAlign = "super";

    middle = (img.offsetTop-container.offsetTop) + 1;

    document.body.removeChild(container);

    this.baseline = baseline;
    this.lineWidth = 1;
    this.middle = middle;
}

module.exports = Font;

},{"./utils":26}],7:[function(_dereq_,module,exports){
var Font = _dereq_('./font');

function FontMetrics() {
    this.data = {};
}

FontMetrics.prototype.getMetrics = function(family, size) {
    if (this.data[family + "-" + size] === undefined) {
        this.data[family + "-" + size] = new Font(family, size);
    }
    return this.data[family + "-" + size];
};

module.exports = FontMetrics;

},{"./font":6}],8:[function(_dereq_,module,exports){
var utils = _dereq_('./utils');
var getBounds = utils.getBounds;
var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;

function FrameContainer(container, sameOrigin, options) {
    this.image = null;
    this.src = container;
    var self = this;
    var bounds = getBounds(container);
    this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function(resolve) {
        if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
            container.contentWindow.onload = container.onload = function() {
                resolve(container);
            };
        } else {
            resolve(container);
        }
    })).then(function(container) {
        var html2canvas = _dereq_('./core');
        return html2canvas(container.contentWindow.document.documentElement, {type: 'view', width: container.width, height: container.height, proxy: options.proxy, javascriptEnabled: options.javascriptEnabled, removeContainer: options.removeContainer, allowTaint: options.allowTaint, imageTimeout: options.imageTimeout / 2});
    }).then(function(canvas) {
        return self.image = canvas;
    });
}

FrameContainer.prototype.proxyLoad = function(proxy, bounds, options) {
    var container = this.src;
    return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
};

module.exports = FrameContainer;

},{"./core":4,"./proxy":16,"./utils":26}],9:[function(_dereq_,module,exports){
function GradientContainer(imageData) {
    this.src = imageData.value;
    this.colorStops = [];
    this.type = null;
    this.x0 = 0.5;
    this.y0 = 0.5;
    this.x1 = 0.5;
    this.y1 = 0.5;
    this.promise = Promise.resolve(true);
}

GradientContainer.TYPES = {
    LINEAR: 1,
    RADIAL: 2
};

// TODO: support hsl[a], negative %/length values
// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
GradientContainer.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i;

module.exports = GradientContainer;

},{}],10:[function(_dereq_,module,exports){
function ImageContainer(src, cors) {
    this.src = src;
    this.image = new Image();
    var self = this;
    this.tainted = null;
    this.promise = new Promise(function(resolve, reject) {
        self.image.onload = resolve;
        self.image.onerror = reject;
        if (cors) {
            self.image.crossOrigin = "anonymous";
        }
        self.image.src = src;
        if (self.image.complete === true) {
            resolve(self.image);
        }
    });
}

module.exports = ImageContainer;

},{}],11:[function(_dereq_,module,exports){
var log = _dereq_('./log');
var ImageContainer = _dereq_('./imagecontainer');
var DummyImageContainer = _dereq_('./dummyimagecontainer');
var ProxyImageContainer = _dereq_('./proxyimagecontainer');
var FrameContainer = _dereq_('./framecontainer');
var SVGContainer = _dereq_('./svgcontainer');
var SVGNodeContainer = _dereq_('./svgnodecontainer');
var LinearGradientContainer = _dereq_('./lineargradientcontainer');
var WebkitGradientContainer = _dereq_('./webkitgradientcontainer');
var bind = _dereq_('./utils').bind;

function ImageLoader(options, support) {
    this.link = null;
    this.options = options;
    this.support = support;
    this.origin = this.getOrigin(window.location.href);
}

ImageLoader.prototype.findImages = function(nodes) {
    var images = [];
    nodes.reduce(function(imageNodes, container) {
        switch(container.node.nodeName) {
        case "IMG":
            return imageNodes.concat([{
                args: [container.node.src],
                method: "url"
            }]);
        case "svg":
        case "IFRAME":
            return imageNodes.concat([{
                args: [container.node],
                method: container.node.nodeName
            }]);
        }
        return imageNodes;
    }, []).forEach(this.addImage(images, this.loadImage), this);
    return images;
};

ImageLoader.prototype.findBackgroundImage = function(images, container) {
    container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
    return images;
};

ImageLoader.prototype.addImage = function(images, callback) {
    return function(newImage) {
        newImage.args.forEach(function(image) {
            if (!this.imageExists(images, image)) {
                images.splice(0, 0, callback.call(this, newImage));
                log('Added image #' + (images.length), typeof(image) === "string" ? image.substring(0, 100) : image);
            }
        }, this);
    };
};

ImageLoader.prototype.hasImageBackground = function(imageData) {
    return imageData.method !== "none";
};

ImageLoader.prototype.loadImage = function(imageData) {
    if (imageData.method === "url") {
        var src = imageData.args[0];
        if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
            return new SVGContainer(src);
        } else if (src.match(/data:image\/.*;base64,/i)) {
            return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
        } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
            return new ImageContainer(src, false);
        } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
            return new ImageContainer(src, true);
        } else if (this.options.proxy) {
            return new ProxyImageContainer(src, this.options.proxy);
        } else {
            return new DummyImageContainer(src);
        }
    } else if (imageData.method === "linear-gradient") {
        return new LinearGradientContainer(imageData);
    } else if (imageData.method === "gradient") {
        return new WebkitGradientContainer(imageData);
    } else if (imageData.method === "svg") {
        return new SVGNodeContainer(imageData.args[0], this.support.svg);
    } else if (imageData.method === "IFRAME") {
        return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
    } else {
        return new DummyImageContainer(imageData);
    }
};

ImageLoader.prototype.isSVG = function(src) {
    return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
};

ImageLoader.prototype.imageExists = function(images, src) {
    return images.some(function(image) {
        return image.src === src;
    });
};

ImageLoader.prototype.isSameOrigin = function(url) {
    return (this.getOrigin(url) === this.origin);
};

ImageLoader.prototype.getOrigin = function(url) {
    var link = this.link || (this.link = document.createElement("a"));
    link.href = url;
    link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
    return link.protocol + link.hostname + link.port;
};

ImageLoader.prototype.getPromise = function(container) {
    return this.timeout(container, this.options.imageTimeout)['catch'](function() {
        var dummy = new DummyImageContainer(container.src);
        return dummy.promise.then(function(image) {
            container.image = image;
        });
    });
};

ImageLoader.prototype.get = function(src) {
    var found = null;
    return this.images.some(function(img) {
        return (found = img).src === src;
    }) ? found : null;
};

ImageLoader.prototype.fetch = function(nodes) {
    this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
    this.images.forEach(function(image, index) {
        image.promise.then(function() {
            log("Succesfully loaded image #"+ (index+1), image);
        }, function(e) {
            log("Failed loading image #"+ (index+1), image, e);
        });
    });
    this.ready = Promise.all(this.images.map(this.getPromise, this));
    log("Finished searching images");
    return this;
};

ImageLoader.prototype.timeout = function(container, timeout) {
    var timer;
    var promise = Promise.race([container.promise, new Promise(function(res, reject) {
        timer = setTimeout(function() {
            log("Timed out loading image", container);
            reject(container);
        }, timeout);
    })]).then(function(container) {
        clearTimeout(timer);
        return container;
    });
    promise['catch'](function() {
        clearTimeout(timer);
    });
    return promise;
};

module.exports = ImageLoader;

},{"./dummyimagecontainer":5,"./framecontainer":8,"./imagecontainer":10,"./lineargradientcontainer":12,"./log":13,"./proxyimagecontainer":17,"./svgcontainer":23,"./svgnodecontainer":24,"./utils":26,"./webkitgradientcontainer":27}],12:[function(_dereq_,module,exports){
var GradientContainer = _dereq_('./gradientcontainer');
var Color = _dereq_('./color');

function LinearGradientContainer(imageData) {
    GradientContainer.apply(this, arguments);
    this.type = GradientContainer.TYPES.LINEAR;

    var hasDirection = LinearGradientContainer.REGEXP_DIRECTION.test( imageData.args[0] ) ||
        !GradientContainer.REGEXP_COLORSTOP.test( imageData.args[0] );

    if (hasDirection) {
        imageData.args[0].split(/\s+/).reverse().forEach(function(position, index) {
            switch(position) {
            case "left":
                this.x0 = 0;
                this.x1 = 1;
                break;
            case "top":
                this.y0 = 0;
                this.y1 = 1;
                break;
            case "right":
                this.x0 = 1;
                this.x1 = 0;
                break;
            case "bottom":
                this.y0 = 1;
                this.y1 = 0;
                break;
            case "to":
                var y0 = this.y0;
                var x0 = this.x0;
                this.y0 = this.y1;
                this.x0 = this.x1;
                this.x1 = x0;
                this.y1 = y0;
                break;
            case "center":
                break; // centered by default
            // Firefox internally converts position keywords to percentages:
            // http://www.w3.org/TR/2010/WD-CSS2-20101207/colors.html#propdef-background-position
            default: // percentage or absolute length
                // TODO: support absolute start point positions (e.g., use bounds to convert px to a ratio)
                var ratio = parseFloat(position, 10) * 1e-2;
                if (isNaN(ratio)) { // invalid or unhandled value
                    break;
                }
                if (index === 0) {
                    this.y0 = ratio;
                    this.y1 = 1 - this.y0;
                } else {
                    this.x0 = ratio;
                    this.x1 = 1 - this.x0;
                }
                break;
            }
        }, this);
    } else {
        this.y0 = 0;
        this.y1 = 1;
    }

    this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function(colorStop) {
        var colorStopMatch = colorStop.match(GradientContainer.REGEXP_COLORSTOP);
        var value = +colorStopMatch[2];
        var unit = value === 0 ? "%" : colorStopMatch[3]; // treat "0" as "0%"
        return {
            color: new Color(colorStopMatch[1]),
            // TODO: support absolute stop positions (e.g., compute gradient line length & convert px to ratio)
            stop: unit === "%" ? value / 100 : null
        };
    });

    if (this.colorStops[0].stop === null) {
        this.colorStops[0].stop = 0;
    }

    if (this.colorStops[this.colorStops.length - 1].stop === null) {
        this.colorStops[this.colorStops.length - 1].stop = 1;
    }

    // calculates and fills-in explicit stop positions when omitted from rule
    this.colorStops.forEach(function(colorStop, index) {
        if (colorStop.stop === null) {
            this.colorStops.slice(index).some(function(find, count) {
                if (find.stop !== null) {
                    colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
                    return true;
                } else {
                    return false;
                }
            }, this);
        }
    }, this);
}

LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
LinearGradientContainer.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i;

module.exports = LinearGradientContainer;

},{"./color":3,"./gradientcontainer":9}],13:[function(_dereq_,module,exports){
var logger = function() {
    if (logger.options.logging && window.console && window.console.log) {
        Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - logger.options.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
    }
};

logger.options = {logging: false};
module.exports = logger;

},{}],14:[function(_dereq_,module,exports){
var Color = _dereq_('./color');
var utils = _dereq_('./utils');
var getBounds = utils.getBounds;
var parseBackgrounds = utils.parseBackgrounds;
var offsetBounds = utils.offsetBounds;

function NodeContainer(node, parent) {
    this.node = node;
    this.parent = parent;
    this.stack = null;
    this.bounds = null;
    this.borders = null;
    this.clip = [];
    this.backgroundClip = [];
    this.offsetBounds = null;
    this.visible = null;
    this.computedStyles = null;
    this.colors = {};
    this.styles = {};
    this.backgroundImages = null;
    this.transformData = null;
    this.transformMatrix = null;
    this.isPseudoElement = false;
    this.opacity = null;
}

NodeContainer.prototype.cloneTo = function(stack) {
    stack.visible = this.visible;
    stack.borders = this.borders;
    stack.bounds = this.bounds;
    stack.clip = this.clip;
    stack.backgroundClip = this.backgroundClip;
    stack.computedStyles = this.computedStyles;
    stack.styles = this.styles;
    stack.backgroundImages = this.backgroundImages;
    stack.opacity = this.opacity;
};

NodeContainer.prototype.getOpacity = function() {
    return this.opacity === null ? (this.opacity = this.cssFloat('opacity')) : this.opacity;
};

NodeContainer.prototype.assignStack = function(stack) {
    this.stack = stack;
    stack.children.push(this);
};

NodeContainer.prototype.isElementVisible = function() {
    return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : (
        this.css('display') !== "none" &&
        this.css('visibility') !== "hidden" &&
        !this.node.hasAttribute("data-html2canvas-ignore") &&
        (this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden")
    );
};

NodeContainer.prototype.css = function(attribute) {
    if (!this.computedStyles) {
        this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
    }

    return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
};

NodeContainer.prototype.prefixedCss = function(attribute) {
    var prefixes = ["webkit", "moz", "ms", "o"];
    var value = this.css(attribute);
    if (value === undefined) {
        prefixes.some(function(prefix) {
            value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
            return value !== undefined;
        }, this);
    }
    return value === undefined ? null : value;
};

NodeContainer.prototype.computedStyle = function(type) {
    return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
};

NodeContainer.prototype.cssInt = function(attribute) {
    var value = parseInt(this.css(attribute), 10);
    return (isNaN(value)) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
};

NodeContainer.prototype.color = function(attribute) {
    return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
};

NodeContainer.prototype.cssFloat = function(attribute) {
    var value = parseFloat(this.css(attribute));
    return (isNaN(value)) ? 0 : value;
};

NodeContainer.prototype.fontWeight = function() {
    var weight = this.css("fontWeight");
    switch(parseInt(weight, 10)){
    case 401:
        weight = "bold";
        break;
    case 400:
        weight = "normal";
        break;
    }
    return weight;
};

NodeContainer.prototype.parseClip = function() {
    var matches = this.css('clip').match(this.CLIP);
    if (matches) {
        return {
            top: parseInt(matches[1], 10),
            right: parseInt(matches[2], 10),
            bottom: parseInt(matches[3], 10),
            left: parseInt(matches[4], 10)
        };
    }
    return null;
};

NodeContainer.prototype.parseBackgroundImages = function() {
    return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
};

NodeContainer.prototype.cssList = function(property, index) {
    var value = (this.css(property) || '').split(',');
    value = value[index || 0] || value[0] || 'auto';
    value = value.trim().split(' ');
    if (value.length === 1) {
        value = [value[0], isPercentage(value[0]) ? 'auto' : value[0]];
    }
    return value;
};

NodeContainer.prototype.parseBackgroundSize = function(bounds, image, index) {
    var size = this.cssList("backgroundSize", index);
    var width, height;

    if (isPercentage(size[0])) {
        width = bounds.width * parseFloat(size[0]) / 100;
    } else if (/contain|cover/.test(size[0])) {
        var targetRatio = bounds.width / bounds.height, currentRatio = image.width / image.height;
        return (targetRatio < currentRatio ^ size[0] === 'contain') ?  {width: bounds.height * currentRatio, height: bounds.height} : {width: bounds.width, height: bounds.width / currentRatio};
    } else {
        width = parseInt(size[0], 10);
    }

    if (size[0] === 'auto' && size[1] === 'auto') {
        height = image.height;
    } else if (size[1] === 'auto') {
        height = width / image.width * image.height;
    } else if (isPercentage(size[1])) {
        height =  bounds.height * parseFloat(size[1]) / 100;
    } else {
        height = parseInt(size[1], 10);
    }

    if (size[0] === 'auto') {
        width = height / image.height * image.width;
    }

    return {width: width, height: height};
};

NodeContainer.prototype.parseBackgroundPosition = function(bounds, image, index, backgroundSize) {
    var position = this.cssList('backgroundPosition', index);
    var left, top;

    if (isPercentage(position[0])){
        left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
    } else {
        left = parseInt(position[0], 10);
    }

    if (position[1] === 'auto') {
        top = left / image.width * image.height;
    } else if (isPercentage(position[1])){
        top =  (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
    } else {
        top = parseInt(position[1], 10);
    }

    if (position[0] === 'auto') {
        left = top / image.height * image.width;
    }

    return {left: left, top: top};
};

NodeContainer.prototype.parseBackgroundRepeat = function(index) {
    return this.cssList("backgroundRepeat", index)[0];
};

NodeContainer.prototype.parseTextShadows = function() {
    var textShadow = this.css("textShadow");
    var results = [];

    if (textShadow && textShadow !== 'none') {
        var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
        for (var i = 0; shadows && (i < shadows.length); i++) {
            var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
            results.push({
                color: new Color(s[0]),
                offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
                offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
                blur: s[3] ? s[3].replace('px', '') : 0
            });
        }
    }
    return results;
};

NodeContainer.prototype.parseTransform = function() {
    if (!this.transformData) {
        if (this.hasTransform()) {
            var offset = this.parseBounds();
            var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
            origin[0] += offset.left;
            origin[1] += offset.top;
            this.transformData = {
                origin: origin,
                matrix: this.parseTransformMatrix()
            };
        } else {
            this.transformData = {
                origin: [0, 0],
                matrix: [1, 0, 0, 1, 0, 0]
            };
        }
    }
    return this.transformData;
};

NodeContainer.prototype.parseTransformMatrix = function() {
    if (!this.transformMatrix) {
        var transform = this.prefixedCss("transform");
        var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
        this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
    }
    return this.transformMatrix;
};

NodeContainer.prototype.parseBounds = function() {
    return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
};

NodeContainer.prototype.hasTransform = function() {
    return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || (this.parent && this.parent.hasTransform());
};

NodeContainer.prototype.getValue = function() {
    var value = this.node.value || "";
    if (this.node.tagName === "SELECT") {
        value = selectionValue(this.node);
    } else if (this.node.type === "password") {
        value = Array(value.length + 1).join('\u2022'); // jshint ignore:line
    }
    return value.length === 0 ? (this.node.placeholder || "") : value;
};

NodeContainer.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/;
NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

function selectionValue(node) {
    var option = node.options[node.selectedIndex || 0];
    return option ? (option.text || "") : "";
}

function parseMatrix(match) {
    if (match && match[1] === "matrix") {
        return match[2].split(",").map(function(s) {
            return parseFloat(s.trim());
        });
    } else if (match && match[1] === "matrix3d") {
        var matrix3d = match[2].split(",").map(function(s) {
          return parseFloat(s.trim());
        });
        return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
    }
}

function isPercentage(value) {
    return value.toString().indexOf("%") !== -1;
}

function removePx(str) {
    return str.replace("px", "");
}

function asFloat(str) {
    return parseFloat(str);
}

module.exports = NodeContainer;

},{"./color":3,"./utils":26}],15:[function(_dereq_,module,exports){
var log = _dereq_('./log');
var punycode = _dereq_('punycode');
var NodeContainer = _dereq_('./nodecontainer');
var TextContainer = _dereq_('./textcontainer');
var PseudoElementContainer = _dereq_('./pseudoelementcontainer');
var FontMetrics = _dereq_('./fontmetrics');
var Color = _dereq_('./color');
var StackingContext = _dereq_('./stackingcontext');
var utils = _dereq_('./utils');
var bind = utils.bind;
var getBounds = utils.getBounds;
var parseBackgrounds = utils.parseBackgrounds;
var offsetBounds = utils.offsetBounds;

function NodeParser(element, renderer, support, imageLoader, options) {
    log("Starting NodeParser");
    this.renderer = renderer;
    this.options = options;
    this.range = null;
    this.support = support;
    this.renderQueue = [];
    this.stack = new StackingContext(true, 1, element.ownerDocument, null);
    var parent = new NodeContainer(element, null);
    if (options.background) {
        renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
    }
    if (element === element.ownerDocument.documentElement) {
        // http://www.w3.org/TR/css3-background/#special-backgrounds
        var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
        renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
    }
    parent.visibile = parent.isElementVisible();
    this.createPseudoHideStyles(element.ownerDocument);
    this.disableAnimations(element.ownerDocument);
    this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function(container) {
        return container.visible = container.isElementVisible();
    }).map(this.getPseudoElements, this));
    this.fontMetrics = new FontMetrics();
    log("Fetched nodes, total:", this.nodes.length);
    log("Calculate overflow clips");
    this.calculateOverflowClips();
    log("Start fetching images");
    this.images = imageLoader.fetch(this.nodes.filter(isElement));
    this.ready = this.images.ready.then(bind(function() {
        log("Images loaded, starting parsing");
        log("Creating stacking contexts");
        this.createStackingContexts();
        log("Sorting stacking contexts");
        this.sortStackingContexts(this.stack);
        this.parse(this.stack);
        log("Render queue created with " + this.renderQueue.length + " items");
        return new Promise(bind(function(resolve) {
            if (!options.async) {
                this.renderQueue.forEach(this.paint, this);
                resolve();
            } else if (typeof(options.async) === "function") {
                options.async.call(this, this.renderQueue, resolve);
            } else if (this.renderQueue.length > 0){
                this.renderIndex = 0;
                this.asyncRenderer(this.renderQueue, resolve);
            } else {
                resolve();
            }
        }, this));
    }, this));
}

NodeParser.prototype.calculateOverflowClips = function() {
    this.nodes.forEach(function(container) {
        if (isElement(container)) {
            if (isPseudoElement(container)) {
                container.appendToDOM();
            }
            container.borders = this.parseBorders(container);
            var clip = (container.css('overflow') === "hidden") ? [container.borders.clip] : [];
            var cssClip = container.parseClip();
            if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
                clip.push([["rect",
                        container.bounds.left + cssClip.left,
                        container.bounds.top + cssClip.top,
                        cssClip.right - cssClip.left,
                        cssClip.bottom - cssClip.top
                ]]);
            }
            container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
            container.backgroundClip = (container.css('overflow') !== "hidden") ? container.clip.concat([container.borders.clip]) : container.clip;
            if (isPseudoElement(container)) {
                container.cleanDOM();
            }
        } else if (isTextNode(container)) {
            container.clip = hasParentClip(container) ? container.parent.clip : [];
        }
        if (!isPseudoElement(container)) {
            container.bounds = null;
        }
    }, this);
};

function hasParentClip(container) {
    return container.parent && container.parent.clip.length;
}

NodeParser.prototype.asyncRenderer = function(queue, resolve, asyncTimer) {
    asyncTimer = asyncTimer || Date.now();
    this.paint(queue[this.renderIndex++]);
    if (queue.length === this.renderIndex) {
        resolve();
    } else if (asyncTimer + 20 > Date.now()) {
        this.asyncRenderer(queue, resolve, asyncTimer);
    } else {
        setTimeout(bind(function() {
            this.asyncRenderer(queue, resolve);
        }, this), 0);
    }
};

NodeParser.prototype.createPseudoHideStyles = function(document) {
    this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
        '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
};

NodeParser.prototype.disableAnimations = function(document) {
    this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
        '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
};

NodeParser.prototype.createStyles = function(document, styles) {
    var hidePseudoElements = document.createElement('style');
    hidePseudoElements.innerHTML = styles;
    document.body.appendChild(hidePseudoElements);
};

NodeParser.prototype.getPseudoElements = function(container) {
    var nodes = [[container]];
    if (container.node.nodeType === Node.ELEMENT_NODE) {
        var before = this.getPseudoElement(container, ":before");
        var after = this.getPseudoElement(container, ":after");

        if (before) {
            nodes.push(before);
        }

        if (after) {
            nodes.push(after);
        }
    }
    return flatten(nodes);
};

function toCamelCase(str) {
    return str.replace(/(\-[a-z])/g, function(match){
        return match.toUpperCase().replace('-','');
    });
}

NodeParser.prototype.getPseudoElement = function(container, type) {
    var style = container.computedStyle(type);
    if(!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
        return null;
    }

    var content = stripQuotes(style.content);
    var isImage = content.substr(0, 3) === 'url';
    var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
    var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

    for (var i = style.length-1; i >= 0; i--) {
        var property = toCamelCase(style.item(i));
        pseudoNode.style[property] = style[property];
    }

    pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

    if (isImage) {
        pseudoNode.src = parseBackgrounds(content)[0].args[0];
        return [pseudoContainer];
    } else {
        var text = document.createTextNode(content);
        pseudoNode.appendChild(text);
        return [pseudoContainer, new TextContainer(text, pseudoContainer)];
    }
};


NodeParser.prototype.getChildren = function(parentContainer) {
    return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function(node) {
        var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
        return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? (container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : []) : container;
    }, this));
};

NodeParser.prototype.newStackingContext = function(container, hasOwnStacking) {
    var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
    container.cloneTo(stack);
    var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
    parentStack.contexts.push(stack);
    container.stack = stack;
};

NodeParser.prototype.createStackingContexts = function() {
    this.nodes.forEach(function(container) {
        if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
            this.newStackingContext(container, true);
        } else if (isElement(container) && ((isPositioned(container) && zIndex0(container)) || isInlineBlock(container) || isFloating(container))) {
            this.newStackingContext(container, false);
        } else {
            container.assignStack(container.parent.stack);
        }
    }, this);
};

NodeParser.prototype.isBodyWithTransparentRoot = function(container) {
    return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
};

NodeParser.prototype.isRootElement = function(container) {
    return container.parent === null;
};

NodeParser.prototype.sortStackingContexts = function(stack) {
    stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
    stack.contexts.forEach(this.sortStackingContexts, this);
};

NodeParser.prototype.parseTextBounds = function(container) {
    return function(text, index, textList) {
        if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
            if (this.support.rangeBounds && !container.parent.hasTransform()) {
                var offset = textList.slice(0, index).join("").length;
                return this.getRangeBounds(container.node, offset, text.length);
            } else if (container.node && typeof(container.node.data) === "string") {
                var replacementNode = container.node.splitText(text.length);
                var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
                container.node = replacementNode;
                return bounds;
            }
        } else if(!this.support.rangeBounds || container.parent.hasTransform()){
            container.node = container.node.splitText(text.length);
        }
        return {};
    };
};

NodeParser.prototype.getWrapperBounds = function(node, transform) {
    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
    var parent = node.parentNode,
        backupText = node.cloneNode(true);

    wrapper.appendChild(node.cloneNode(true));
    parent.replaceChild(wrapper, node);
    var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
    parent.replaceChild(backupText, wrapper);
    return bounds;
};

NodeParser.prototype.getRangeBounds = function(node, offset, length) {
    var range = this.range || (this.range = node.ownerDocument.createRange());
    range.setStart(node, offset);
    range.setEnd(node, offset + length);
    return range.getBoundingClientRect();
};

function ClearTransform() {}

NodeParser.prototype.parse = function(stack) {
    // http://www.w3.org/TR/CSS21/visuren.html#z-index
    var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
    var descendantElements = stack.children.filter(isElement);
    var descendantNonFloats = descendantElements.filter(not(isFloating));
    var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
    var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
    var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
    var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
    var text = stack.children.filter(isTextNode).filter(hasText);
    var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
    negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats)
        .concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function(container) {
            this.renderQueue.push(container);
            if (isStackingContext(container)) {
                this.parse(container);
                this.renderQueue.push(new ClearTransform());
            }
        }, this);
};

NodeParser.prototype.paint = function(container) {
    try {
        if (container instanceof ClearTransform) {
            this.renderer.ctx.restore();
        } else if (isTextNode(container)) {
            if (isPseudoElement(container.parent)) {
                container.parent.appendToDOM();
            }
            this.paintText(container);
            if (isPseudoElement(container.parent)) {
                container.parent.cleanDOM();
            }
        } else {
            this.paintNode(container);
        }
    } catch(e) {
        log(e);
        if (this.options.strict) {
            throw e;
        }
    }
};

NodeParser.prototype.paintNode = function(container) {
    if (isStackingContext(container)) {
        this.renderer.setOpacity(container.opacity);
        this.renderer.ctx.save();
        if (container.hasTransform()) {
            this.renderer.setTransform(container.parseTransform());
        }
    }

    if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
        this.paintCheckbox(container);
    } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
        this.paintRadio(container);
    } else {
        this.paintElement(container);
    }
};

NodeParser.prototype.paintElement = function(container) {
    var bounds = container.parseBounds();
    this.renderer.clip(container.backgroundClip, function() {
        this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
    }, this);

    this.renderer.clip(container.clip, function() {
        this.renderer.renderBorders(container.borders.borders);
    }, this);

    this.renderer.clip(container.backgroundClip, function() {
        switch (container.node.nodeName) {
        case "svg":
        case "IFRAME":
            var imgContainer = this.images.get(container.node);
            if (imgContainer) {
                this.renderer.renderImage(container, bounds, container.borders, imgContainer);
            } else {
                log("Error loading <" + container.node.nodeName + ">", container.node);
            }
            break;
        case "IMG":
            var imageContainer = this.images.get(container.node.src);
            if (imageContainer) {
                this.renderer.renderImage(container, bounds, container.borders, imageContainer);
            } else {
                log("Error loading <img>", container.node.src);
            }
            break;
        case "CANVAS":
            this.renderer.renderImage(container, bounds, container.borders, {image: container.node});
            break;
        case "SELECT":
        case "INPUT":
        case "TEXTAREA":
            this.paintFormValue(container);
            break;
        }
    }, this);
};

NodeParser.prototype.paintCheckbox = function(container) {
    var b = container.parseBounds();

    var size = Math.min(b.width, b.height);
    var bounds = {width: size - 1, height: size - 1, top: b.top, left: b.left};
    var r = [3, 3];
    var radius = [r, r, r, r];
    var borders = [1,1,1,1].map(function(w) {
        return {color: new Color('#A5A5A5'), width: w};
    });

    var borderPoints = calculateCurvePoints(bounds, radius, borders);

    this.renderer.clip(container.backgroundClip, function() {
        this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
        this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
        if (container.node.checked) {
            this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', (size - 3) + "px", 'arial');
            this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
        }
    }, this);
};

NodeParser.prototype.paintRadio = function(container) {
    var bounds = container.parseBounds();

    var size = Math.min(bounds.width, bounds.height) - 2;

    this.renderer.clip(container.backgroundClip, function() {
        this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
        if (container.node.checked) {
            this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
        }
    }, this);
};

NodeParser.prototype.paintFormValue = function(container) {
    var value = container.getValue();
    if (value.length > 0) {
        var document = container.node.ownerDocument;
        var wrapper = document.createElement('html2canvaswrapper');
        var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
            'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
            'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
            'boxSizing', 'whiteSpace', 'wordWrap'];

        properties.forEach(function(property) {
            try {
                wrapper.style[property] = container.css(property);
            } catch(e) {
                // Older IE has issues with "border"
                log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
            }
        });
        var bounds = container.parseBounds();
        wrapper.style.position = "fixed";
        wrapper.style.left = bounds.left + "px";
        wrapper.style.top = bounds.top + "px";
        wrapper.textContent = value;
        document.body.appendChild(wrapper);
        this.paintText(new TextContainer(wrapper.firstChild, container));
        document.body.removeChild(wrapper);
    }
};

NodeParser.prototype.paintText = function(container) {
    container.applyTextTransform();
    var characters = punycode.ucs2.decode(container.node.data);
    var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function(character) {
        return punycode.ucs2.encode([character]);
    });

    var weight = container.parent.fontWeight();
    var size = container.parent.css('fontSize');
    var family = container.parent.css('fontFamily');
    var shadows = container.parent.parseTextShadows();

    this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
    if (shadows.length) {
        // TODO: support multiple text shadows
        this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
    } else {
        this.renderer.clearShadow();
    }

    this.renderer.clip(container.parent.clip, function() {
        textList.map(this.parseTextBounds(container), this).forEach(function(bounds, index) {
            if (bounds) {
                this.renderer.text(textList[index], bounds.left, bounds.bottom);
                this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
            }
        }, this);
    }, this);
};

NodeParser.prototype.renderTextDecoration = function(container, bounds, metrics) {
    switch(container.css("textDecoration").split(" ")[0]) {
    case "underline":
        // Draws a line at the baseline of the font
        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
        this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
        break;
    case "overline":
        this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
        break;
    case "line-through":
        // TODO try and find exact position for line-through
        this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
        break;
    }
};

var borderColorTransforms = {
    inset: [
        ["darken", 0.60],
        ["darken", 0.10],
        ["darken", 0.10],
        ["darken", 0.60]
    ]
};

NodeParser.prototype.parseBorders = function(container) {
    var nodeBounds = container.parseBounds();
    var radius = getBorderRadiusData(container);
    var borders = ["Top", "Right", "Bottom", "Left"].map(function(side, index) {
        var style = container.css('border' + side + 'Style');
        var color = container.color('border' + side + 'Color');
        if (style === "inset" && color.isBlack()) {
            color = new Color([255, 255, 255, color.a]); // this is wrong, but
        }
        var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
        return {
            width: container.cssInt('border' + side + 'Width'),
            color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
            args: null
        };
    });
    var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

    return {
        clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
        borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
    };
};

function calculateBorders(borders, nodeBounds, borderPoints, radius) {
    return borders.map(function(border, borderSide) {
        if (border.width > 0) {
            var bx = nodeBounds.left;
            var by = nodeBounds.top;
            var bw = nodeBounds.width;
            var bh = nodeBounds.height - (borders[2].width);

            switch(borderSide) {
            case 0:
                // top border
                bh = borders[0].width;
                border.args = drawSide({
                        c1: [bx, by],
                        c2: [bx + bw, by],
                        c3: [bx + bw - borders[1].width, by + bh],
                        c4: [bx + borders[3].width, by + bh]
                    }, radius[0], radius[1],
                    borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
                break;
            case 1:
                // right border
                bx = nodeBounds.left + nodeBounds.width - (borders[1].width);
                bw = borders[1].width;

                border.args = drawSide({
                        c1: [bx + bw, by],
                        c2: [bx + bw, by + bh + borders[2].width],
                        c3: [bx, by + bh],
                        c4: [bx, by + borders[0].width]
                    }, radius[1], radius[2],
                    borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
                break;
            case 2:
                // bottom border
                by = (by + nodeBounds.height) - (borders[2].width);
                bh = borders[2].width;
                border.args = drawSide({
                        c1: [bx + bw, by + bh],
                        c2: [bx, by + bh],
                        c3: [bx + borders[3].width, by],
                        c4: [bx + bw - borders[3].width, by]
                    }, radius[2], radius[3],
                    borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
                break;
            case 3:
                // left border
                bw = borders[3].width;
                border.args = drawSide({
                        c1: [bx, by + bh + borders[2].width],
                        c2: [bx, by],
                        c3: [bx + bw, by + borders[0].width],
                        c4: [bx + bw, by + bh]
                    }, radius[3], radius[0],
                    borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
                break;
            }
        }
        return border;
    });
}

NodeParser.prototype.parseBackgroundClip = function(container, borderPoints, borders, radius, bounds) {
    var backgroundClip = container.css('backgroundClip'),
        borderArgs = [];

    switch(backgroundClip) {
    case "content-box":
    case "padding-box":
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
        break;

    default:
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
        break;
    }

    return borderArgs;
};

function getCurvePoints(x, y, r1, r2) {
    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
    var ox = (r1) * kappa, // control point offset horizontal
        oy = (r2) * kappa, // control point offset vertical
        xm = x + r1, // x-middle
        ym = y + r2; // y-middle
    return {
        topLeft: bezierCurve({x: x, y: ym}, {x: x, y: ym - oy}, {x: xm - ox, y: y}, {x: xm, y: y}),
        topRight: bezierCurve({x: x, y: y}, {x: x + ox,y: y}, {x: xm, y: ym - oy}, {x: xm, y: ym}),
        bottomRight: bezierCurve({x: xm, y: y}, {x: xm, y: y + oy}, {x: x + ox, y: ym}, {x: x, y: ym}),
        bottomLeft: bezierCurve({x: xm, y: ym}, {x: xm - ox, y: ym}, {x: x, y: y + oy}, {x: x, y:y})
    };
}

function calculateCurvePoints(bounds, borderRadius, borders) {
    var x = bounds.left,
        y = bounds.top,
        width = bounds.width,
        height = bounds.height,

        tlh = borderRadius[0][0] < width / 2 ? borderRadius[0][0] : width / 2,
        tlv = borderRadius[0][1] < height / 2 ? borderRadius[0][1] : height / 2,
        trh = borderRadius[1][0] < width / 2 ? borderRadius[1][0] : width / 2,
        trv = borderRadius[1][1] < height / 2 ? borderRadius[1][1] : height / 2,
        brh = borderRadius[2][0] < width / 2 ? borderRadius[2][0] : width / 2,
        brv = borderRadius[2][1] < height / 2 ? borderRadius[2][1] : height / 2,
        blh = borderRadius[3][0] < width / 2 ? borderRadius[3][0] : width / 2,
        blv = borderRadius[3][1] < height / 2 ? borderRadius[3][1] : height / 2;

    var topWidth = width - trh,
        rightHeight = height - brv,
        bottomWidth = width - brh,
        leftHeight = height - blv;

    return {
        topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
        topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
        topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
        topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
        bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
        bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width),  brv - borders[2].width).bottomRight.subdivide(0.5),
        bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
        bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
    };
}

function bezierCurve(start, startControl, endControl, end) {
    var lerp = function (a, b, t) {
        return {
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t
        };
    };

    return {
        start: start,
        startControl: startControl,
        endControl: endControl,
        end: end,
        subdivide: function(t) {
            var ab = lerp(start, startControl, t),
                bc = lerp(startControl, endControl, t),
                cd = lerp(endControl, end, t),
                abbc = lerp(ab, bc, t),
                bccd = lerp(bc, cd, t),
                dest = lerp(abbc, bccd, t);
            return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
        },
        curveTo: function(borderArgs) {
            borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
        },
        curveToReversed: function(borderArgs) {
            borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
        }
    };
}

function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
    var borderArgs = [];

    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
        outer1[1].curveTo(borderArgs);
    } else {
        borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
        borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
        outer2[0].curveTo(borderArgs);
        borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
        inner2[0].curveToReversed(borderArgs);
    } else {
        borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
        borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
    }

    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
        inner1[1].curveToReversed(borderArgs);
    } else {
        borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
    }

    return borderArgs;
}

function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
    if (radius1[0] > 0 || radius1[1] > 0) {
        borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
        corner1[0].curveTo(borderArgs);
        corner1[1].curveTo(borderArgs);
    } else {
        borderArgs.push(["line", x, y]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
        borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
    }
}

function negativeZIndex(container) {
    return container.cssInt("zIndex") < 0;
}

function positiveZIndex(container) {
    return container.cssInt("zIndex") > 0;
}

function zIndex0(container) {
    return container.cssInt("zIndex") === 0;
}

function inlineLevel(container) {
    return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
}

function isStackingContext(container) {
    return (container instanceof StackingContext);
}

function hasText(container) {
    return container.node.data.trim().length > 0;
}

function noLetterSpacing(container) {
    return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
}

function getBorderRadiusData(container) {
    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
        var value = container.css('border' + side + 'Radius');
        var arr = value.split(" ");
        if (arr.length <= 1) {
            arr[1] = arr[0];
        }
        return arr.map(asInt);
    });
}

function renderableNode(node) {
    return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
}

function isPositionedForStacking(container) {
    var position = container.css("position");
    var zIndex = (["absolute", "relative", "fixed"].indexOf(position) !== -1) ? container.css("zIndex") : "auto";
    return zIndex !== "auto";
}

function isPositioned(container) {
    return container.css("position") !== "static";
}

function isFloating(container) {
    return container.css("float") !== "none";
}

function isInlineBlock(container) {
    return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
}

function not(callback) {
    var context = this;
    return function() {
        return !callback.apply(context, arguments);
    };
}

function isElement(container) {
    return container.node.nodeType === Node.ELEMENT_NODE;
}

function isPseudoElement(container) {
    return container.isPseudoElement === true;
}

function isTextNode(container) {
    return container.node.nodeType === Node.TEXT_NODE;
}

function zIndexSort(contexts) {
    return function(a, b) {
        return (a.cssInt("zIndex") + (contexts.indexOf(a) / contexts.length)) - (b.cssInt("zIndex") + (contexts.indexOf(b) / contexts.length));
    };
}

function hasOpacity(container) {
    return container.getOpacity() < 1;
}

function asInt(value) {
    return parseInt(value, 10);
}

function getWidth(border) {
    return border.width;
}

function nonIgnoredElement(nodeContainer) {
    return (nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1);
}

function flatten(arrays) {
    return [].concat.apply([], arrays);
}

function stripQuotes(content) {
    var first = content.substr(0, 1);
    return (first === content.substr(content.length - 1) && first.match(/'|"/)) ? content.substr(1, content.length - 2) : content;
}

function getWords(characters) {
    var words = [], i = 0, onWordBoundary = false, word;
    while(characters.length) {
        if (isWordBoundary(characters[i]) === onWordBoundary) {
            word = characters.splice(0, i);
            if (word.length) {
                words.push(punycode.ucs2.encode(word));
            }
            onWordBoundary =! onWordBoundary;
            i = 0;
        } else {
            i++;
        }

        if (i >= characters.length) {
            word = characters.splice(0, i);
            if (word.length) {
                words.push(punycode.ucs2.encode(word));
            }
        }
    }
    return words;
}

function isWordBoundary(characterCode) {
    return [
        32, // <space>
        13, // \r
        10, // \n
        9, // \t
        45 // -
    ].indexOf(characterCode) !== -1;
}

function hasUnicode(string) {
    return (/[^\u0000-\u00ff]/).test(string);
}

module.exports = NodeParser;

},{"./color":3,"./fontmetrics":7,"./log":13,"./nodecontainer":14,"./pseudoelementcontainer":18,"./stackingcontext":21,"./textcontainer":25,"./utils":26,"punycode":1}],16:[function(_dereq_,module,exports){
var XHR = _dereq_('./xhr');
var utils = _dereq_('./utils');
var log = _dereq_('./log');
var createWindowClone = _dereq_('./clone');
var decode64 = utils.decode64;

function Proxy(src, proxyUrl, document) {
    var supportsCORS = ('withCredentials' in new XMLHttpRequest());
    if (!proxyUrl) {
        return Promise.reject("No proxy configured");
    }
    var callback = createCallback(supportsCORS);
    var url = createProxyUrl(proxyUrl, src, callback);

    return supportsCORS ? XHR(url) : (jsonp(document, url, callback).then(function(response) {
        return decode64(response.content);
    }));
}
var proxyCount = 0;

function ProxyURL(src, proxyUrl, document) {
    var supportsCORSImage = ('crossOrigin' in new Image());
    var callback = createCallback(supportsCORSImage);
    var url = createProxyUrl(proxyUrl, src, callback);
    return (supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function(response) {
        return "data:" + response.type + ";base64," + response.content;
    }));
}

function jsonp(document, url, callback) {
    return new Promise(function(resolve, reject) {
        var s = document.createElement("script");
        var cleanup = function() {
            delete window.OfficeBrowserFeedback.html2canvas.proxy[callback];
            document.body.removeChild(s);
        };
        window.OfficeBrowserFeedback.html2canvas.proxy[callback] = function (response) {
            cleanup();
            resolve(response);
        };
        s.src = url;
        s.onerror = function(e) {
            cleanup();
            reject(e);
        };
        document.body.appendChild(s);
    });
}

function createCallback(useCORS) {
    return !useCORS ? "html2canvas_" + Date.now() + "_" + (++proxyCount) + "_" + Math.round(Math.random() * 100000) : "";
}

function createProxyUrl(proxyUrl, src, callback) {
    return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
}

function documentFromHTML(src) {
    return function(html) {
        var parser = new DOMParser(), doc;
        try {
            doc = parser.parseFromString(html, "text/html");
        } catch(e) {
            log("DOMParser not supported, falling back to createHTMLDocument");
            doc = document.implementation.createHTMLDocument("");
            try {
                doc.open();
                doc.write(html);
                doc.close();
            } catch(ee) {
                log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
                doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
            }
        }

        var b = doc.querySelector("base");
        if (!b || !b.href.host) {
            var base = doc.createElement("base");
            base.href = src;
            doc.head.insertBefore(base, doc.head.firstChild);
        }

        return doc;
    };
}

function loadUrlDocument(src, proxy, document, width, height, options) {
    return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function(doc) {
        return createWindowClone(doc, document, width, height, options, 0, 0);
    });
}

exports.Proxy = Proxy;
exports.ProxyURL = ProxyURL;
exports.loadUrlDocument = loadUrlDocument;

},{"./clone":2,"./log":13,"./utils":26,"./xhr":28}],17:[function(_dereq_,module,exports){
var ProxyURL = _dereq_('./proxy').ProxyURL;

function ProxyImageContainer(src, proxy) {
    var link = document.createElement("a");
    link.href = src;
    src = link.href;
    this.src = src;
    this.image = new Image();
    var self = this;
    this.promise = new Promise(function(resolve, reject) {
        self.image.crossOrigin = "Anonymous";
        self.image.onload = resolve;
        self.image.onerror = reject;

        new ProxyURL(src, proxy, document).then(function(url) {
            self.image.src = url;
        })['catch'](reject);
    });
}

module.exports = ProxyImageContainer;

},{"./proxy":16}],18:[function(_dereq_,module,exports){
var NodeContainer = _dereq_('./nodecontainer');

function PseudoElementContainer(node, parent, type) {
    NodeContainer.call(this, node, parent);
    this.isPseudoElement = true;
    this.before = type === ":before";
}

PseudoElementContainer.prototype.cloneTo = function(stack) {
    PseudoElementContainer.prototype.cloneTo.call(this, stack);
    stack.isPseudoElement = true;
    stack.before = this.before;
};

PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

PseudoElementContainer.prototype.appendToDOM = function() {
    if (this.before) {
        this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
    } else {
        this.parent.node.appendChild(this.node);
    }
    this.parent.node.className += " " + this.getHideClass();
};

PseudoElementContainer.prototype.cleanDOM = function() {
    this.node.parentNode.removeChild(this.node);
    this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
};

PseudoElementContainer.prototype.getHideClass = function() {
    return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
};

PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

module.exports = PseudoElementContainer;

},{"./nodecontainer":14}],19:[function(_dereq_,module,exports){
var log = _dereq_('./log');

function Renderer(width, height, images, options, document) {
    this.width = width;
    this.height = height;
    this.images = images;
    this.options = options;
    this.document = document;
}

Renderer.prototype.renderImage = function(container, bounds, borderData, imageContainer) {
    var paddingLeft = container.cssInt('paddingLeft'),
        paddingTop = container.cssInt('paddingTop'),
        paddingRight = container.cssInt('paddingRight'),
        paddingBottom = container.cssInt('paddingBottom'),
        borders = borderData.borders;

    var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
    var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
    this.drawImage(
        imageContainer,
        0,
        0,
        imageContainer.image.width || width,
        imageContainer.image.height || height,
        bounds.left + paddingLeft + borders[3].width,
        bounds.top + paddingTop + borders[0].width,
        width,
        height
    );
};

Renderer.prototype.renderBackground = function(container, bounds, borderData) {
    if (bounds.height > 0 && bounds.width > 0) {
        this.renderBackgroundColor(container, bounds);
        this.renderBackgroundImage(container, bounds, borderData);
    }
};

Renderer.prototype.renderBackgroundColor = function(container, bounds) {
    var color = container.color("backgroundColor");
    if (!color.isTransparent()) {
        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
    }
};

Renderer.prototype.renderBorders = function(borders) {
    borders.forEach(this.renderBorder, this);
};

Renderer.prototype.renderBorder = function(data) {
    if (!data.color.isTransparent() && data.args !== null) {
        this.drawShape(data.args, data.color);
    }
};

Renderer.prototype.renderBackgroundImage = function(container, bounds, borderData) {
    var backgroundImages = container.parseBackgroundImages();
    backgroundImages.reverse().forEach(function(backgroundImage, index, arr) {
        switch(backgroundImage.method) {
        case "url":
            var image = this.images.get(backgroundImage.args[0]);
            if (image) {
                this.renderBackgroundRepeating(container, bounds, image, arr.length - (index+1), borderData);
            } else {
                log("Error loading background-image", backgroundImage.args[0]);
            }
            break;
        case "linear-gradient":
        case "gradient":
            var gradientImage = this.images.get(backgroundImage.value);
            if (gradientImage) {
                this.renderBackgroundGradient(gradientImage, bounds, borderData);
            } else {
                log("Error loading background-image", backgroundImage.args[0]);
            }
            break;
        case "none":
            break;
        default:
            log("Unknown background-image type", backgroundImage.args[0]);
        }
    }, this);
};

Renderer.prototype.renderBackgroundRepeating = function(container, bounds, imageContainer, index, borderData) {
    var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
    var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
    var repeat = container.parseBackgroundRepeat(index);
    switch (repeat) {
    case "repeat-x":
    case "repeat no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
        break;
    case "repeat-y":
    case "no-repeat repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
        break;
    case "no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
        break;
    default:
        this.renderBackgroundRepeat(imageContainer, position, size, {top: bounds.top, left: bounds.left}, borderData[3], borderData[0]);
        break;
    }
};

module.exports = Renderer;

},{"./log":13}],20:[function(_dereq_,module,exports){
var Renderer = _dereq_('../renderer');
var LinearGradientContainer = _dereq_('../lineargradientcontainer');
var log = _dereq_('../log');

function CanvasRenderer(width, height) {
    Renderer.apply(this, arguments);
    this.canvas = this.options.canvas || this.document.createElement("canvas");
    if (!this.options.canvas) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    this.ctx = this.canvas.getContext("2d");
    this.taintCtx = this.document.createElement("canvas").getContext("2d");
    this.ctx.textBaseline = "bottom";
    this.variables = {};
    log("Initialized CanvasRenderer with size", width, "x", height);
}

CanvasRenderer.prototype = Object.create(Renderer.prototype);

CanvasRenderer.prototype.setFillStyle = function(fillStyle) {
    this.ctx.fillStyle = typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
    return this.ctx;
};

CanvasRenderer.prototype.rectangle = function(left, top, width, height, color) {
    this.setFillStyle(color).fillRect(left, top, width, height);
};

CanvasRenderer.prototype.circle = function(left, top, size, color) {
    this.setFillStyle(color);
    this.ctx.beginPath();
    this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI*2, true);
    this.ctx.closePath();
    this.ctx.fill();
};

CanvasRenderer.prototype.circleStroke = function(left, top, size, color, stroke, strokeColor) {
    this.circle(left, top, size, color);
    this.ctx.strokeStyle = strokeColor.toString();
    this.ctx.stroke();
};

CanvasRenderer.prototype.drawShape = function(shape, color) {
    this.shape(shape);
    this.setFillStyle(color).fill();
};

CanvasRenderer.prototype.taints = function(imageContainer) {
    if (imageContainer.tainted === null) {
        this.taintCtx.drawImage(imageContainer.image, 0, 0);
        try {
            this.taintCtx.getImageData(0, 0, 1, 1);
            imageContainer.tainted = false;
        } catch(e) {
            this.taintCtx = document.createElement("canvas").getContext("2d");
            imageContainer.tainted = true;
        }
    }

    return imageContainer.tainted;
};

CanvasRenderer.prototype.drawImage = function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (!this.taints(imageContainer) || this.options.allowTaint) {
        this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
};

CanvasRenderer.prototype.clip = function(shapes, callback, context) {
    this.ctx.save();
    shapes.filter(hasEntries).forEach(function(shape) {
        this.shape(shape).clip();
    }, this);
    callback.call(context);
    this.ctx.restore();
};

CanvasRenderer.prototype.shape = function(shape) {
    this.ctx.beginPath();
    shape.forEach(function(point, index) {
        if (point[0] === "rect") {
            this.ctx.rect.apply(this.ctx, point.slice(1));
        } else {
            this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
        }
    }, this);
    this.ctx.closePath();
    return this.ctx;
};

CanvasRenderer.prototype.font = function(color, style, variant, weight, size, family) {
    this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
};

CanvasRenderer.prototype.fontShadow = function(color, offsetX, offsetY, blur) {
    this.setVariable("shadowColor", color.toString())
        .setVariable("shadowOffsetY", offsetX)
        .setVariable("shadowOffsetX", offsetY)
        .setVariable("shadowBlur", blur);
};

CanvasRenderer.prototype.clearShadow = function() {
    this.setVariable("shadowColor", "rgba(0,0,0,0)");
};

CanvasRenderer.prototype.setOpacity = function(opacity) {
    this.ctx.globalAlpha = opacity;
};

CanvasRenderer.prototype.setTransform = function(transform) {
    this.ctx.translate(transform.origin[0], transform.origin[1]);
    this.ctx.transform.apply(this.ctx, transform.matrix);
    this.ctx.translate(-transform.origin[0], -transform.origin[1]);
};

CanvasRenderer.prototype.setVariable = function(property, value) {
    if (this.variables[property] !== value) {
        this.variables[property] = this.ctx[property] = value;
    }

    return this;
};

CanvasRenderer.prototype.text = function(text, left, bottom) {
    this.ctx.fillText(text, left, bottom);
};

CanvasRenderer.prototype.backgroundRepeatShape = function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
    var shape = [
        ["line", Math.round(left), Math.round(top)],
        ["line", Math.round(left + width), Math.round(top)],
        ["line", Math.round(left + width), Math.round(height + top)],
        ["line", Math.round(left), Math.round(height + top)]
    ];
    this.clip([shape], function() {
        this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
    }, this);
};

CanvasRenderer.prototype.renderBackgroundRepeat = function(imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
    var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft), offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
    this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
    this.ctx.translate(offsetX, offsetY);
    this.ctx.fill();
    this.ctx.translate(-offsetX, -offsetY);
};

CanvasRenderer.prototype.renderBackgroundGradient = function(gradientImage, bounds) {
    if (gradientImage instanceof LinearGradientContainer) {
        var gradient = this.ctx.createLinearGradient(
            bounds.left + bounds.width * gradientImage.x0,
            bounds.top + bounds.height * gradientImage.y0,
            bounds.left +  bounds.width * gradientImage.x1,
            bounds.top +  bounds.height * gradientImage.y1);
        gradientImage.colorStops.forEach(function(colorStop) {
            gradient.addColorStop(colorStop.stop, colorStop.color.toString());
        });
        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
    }
};

CanvasRenderer.prototype.resizeImage = function(imageContainer, size) {
    var image = imageContainer.image;
    if(image.width === size.width && image.height === size.height) {
        return image;
    }

    var ctx, canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height );
    return canvas;
};

function hasEntries(array) {
    return array.length > 0;
}

module.exports = CanvasRenderer;

},{"../lineargradientcontainer":12,"../log":13,"../renderer":19}],21:[function(_dereq_,module,exports){
var NodeContainer = _dereq_('./nodecontainer');

function StackingContext(hasOwnStacking, opacity, element, parent) {
    NodeContainer.call(this, element, parent);
    this.ownStacking = hasOwnStacking;
    this.contexts = [];
    this.children = [];
    this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
}

StackingContext.prototype = Object.create(NodeContainer.prototype);

StackingContext.prototype.getParentStack = function(context) {
    var parentStack = (this.parent) ? this.parent.stack : null;
    return parentStack ? (parentStack.ownStacking ? parentStack : parentStack.getParentStack(context)) : context.stack;
};

module.exports = StackingContext;

},{"./nodecontainer":14}],22:[function(_dereq_,module,exports){
function Support(document) {
    this.rangeBounds = this.testRangeBounds(document);
    this.cors = this.testCORS();
    this.svg = this.testSVG();
}

Support.prototype.testRangeBounds = function(document) {
    var range, testElement, rangeBounds, rangeHeight, support = false;

    if (document.createRange) {
        range = document.createRange();
        if (range.getBoundingClientRect) {
            testElement = document.createElement('boundtest');
            testElement.style.height = "123px";
            testElement.style.display = "block";
            document.body.appendChild(testElement);

            range.selectNode(testElement);
            rangeBounds = range.getBoundingClientRect();
            rangeHeight = rangeBounds.height;

            if (rangeHeight === 123) {
                support = true;
            }
            document.body.removeChild(testElement);
        }
    }

    return support;
};

Support.prototype.testCORS = function() {
    return typeof((new Image()).crossOrigin) !== "undefined";
};

Support.prototype.testSVG = function() {
    var img = new Image();
    var canvas = document.createElement("canvas");
    var ctx =  canvas.getContext("2d");
    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

    try {
        ctx.drawImage(img, 0, 0);
        canvas.toDataURL();
    } catch(e) {
        return false;
    }
    return true;
};

module.exports = Support;

},{}],23:[function(_dereq_,module,exports){
var XHR = _dereq_('./xhr');
var decode64 = _dereq_('./utils').decode64;

function SVGContainer(src) {
    this.src = src;
    this.image = null;
    var self = this;

    this.promise = this.hasFabric().then(function() {
        return (self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src));
    }).then(function(svg) {
        return new Promise(function(resolve) {
            window.OfficeBrowserFeedback.html2canvas.svg.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
        });
    });
}

SVGContainer.prototype.hasFabric = function() {
    return !window.OfficeBrowserFeedback.html2canvas.svg || !window.OfficeBrowserFeedback.html2canvas.svg.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
};

SVGContainer.prototype.inlineFormatting = function(src) {
    return (/^data:image\/svg\+xml;base64,/.test(src)) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
};

SVGContainer.prototype.removeContentType = function(src) {
    return src.replace(/^data:image\/svg\+xml(;base64)?,/,'');
};

SVGContainer.prototype.isInline = function(src) {
    return (/^data:image\/svg\+xml/i.test(src));
};

SVGContainer.prototype.createCanvas = function(resolve) {
    var self = this;
    return function (objects, options) {
        var canvas = new window.OfficeBrowserFeedback.html2canvas.svg.fabric.StaticCanvas('c');
        self.image = canvas.lowerCanvasEl;
        canvas
            .setWidth(options.width)
            .setHeight(options.height)
            .add(window.OfficeBrowserFeedback.html2canvas.svg.fabric.util.groupSVGElements(objects, options))
            .renderAll();
        resolve(canvas.lowerCanvasEl);
    };
};

SVGContainer.prototype.decode64 = function(str) {
    return (typeof(window.atob) === "function") ? window.atob(str) : decode64(str);
};

module.exports = SVGContainer;

},{"./utils":26,"./xhr":28}],24:[function(_dereq_,module,exports){
var SVGContainer = _dereq_('./svgcontainer');

function SVGNodeContainer(node, _native) {
    this.src = node;
    this.image = null;
    var self = this;

    this.promise = _native ? new Promise(function(resolve, reject) {
        self.image = new Image();
        self.image.onload = resolve;
        self.image.onerror = reject;
        self.image.src = "data:image/svg+xml," + (new XMLSerializer()).serializeToString(node);
        if (self.image.complete === true) {
            resolve(self.image);
        }
    }) : this.hasFabric().then(function() {
        return new Promise(function(resolve) {
            window.OfficeBrowserFeedback.html2canvas.svg.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
        });
    });
}

SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);

module.exports = SVGNodeContainer;

},{"./svgcontainer":23}],25:[function(_dereq_,module,exports){
var NodeContainer = _dereq_('./nodecontainer');

function TextContainer(node, parent) {
    NodeContainer.call(this, node, parent);
}

TextContainer.prototype = Object.create(NodeContainer.prototype);

TextContainer.prototype.applyTextTransform = function() {
    this.node.data = this.transform(this.parent.css("textTransform"));
};

TextContainer.prototype.transform = function(transform) {
    var text = this.node.data;
    switch(transform){
        case "lowercase":
            return text.toLowerCase();
        case "capitalize":
            return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
        case "uppercase":
            return text.toUpperCase();
        default:
            return text;
    }
};

function capitalize(m, p1, p2) {
    if (m.length > 0) {
        return p1 + p2.toUpperCase();
    }
}

module.exports = TextContainer;

},{"./nodecontainer":14}],26:[function(_dereq_,module,exports){
exports.smallImage = function smallImage() {
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
};

exports.bind = function(callback, context) {
    return function() {
        return callback.apply(context, arguments);
    };
};

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

exports.decode64 = function(base64) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var len = base64.length, i, encoded1, encoded2, encoded3, encoded4, byte1, byte2, byte3;

    var output = "";

    for (i = 0; i < len; i+=4) {
        encoded1 = chars.indexOf(base64[i]);
        encoded2 = chars.indexOf(base64[i+1]);
        encoded3 = chars.indexOf(base64[i+2]);
        encoded4 = chars.indexOf(base64[i+3]);

        byte1 = (encoded1 << 2) | (encoded2 >> 4);
        byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        byte3 = ((encoded3 & 3) << 6) | encoded4;
        if (encoded3 === 64) {
            output += String.fromCharCode(byte1);
        } else if (encoded4 === 64 || encoded4 === -1) {
            output += String.fromCharCode(byte1, byte2);
        } else{
            output += String.fromCharCode(byte1, byte2, byte3);
        }
    }

    return output;
};

exports.getBounds = function(node) {
    if (node.getBoundingClientRect) {
        var clientRect = node.getBoundingClientRect();
        var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
        return {
            top: clientRect.top,
            bottom: clientRect.bottom || (clientRect.top + clientRect.height),
            right: clientRect.left + width,
            left: clientRect.left,
            width:  width,
            height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
        };
    }
    return {};
};

exports.offsetBounds = function(node) {
    var parent = node.offsetParent ? exports.offsetBounds(node.offsetParent) : {top: 0, left: 0};

    return {
        top: node.offsetTop + parent.top,
        bottom: node.offsetTop + node.offsetHeight + parent.top,
        right: node.offsetLeft + parent.left + node.offsetWidth,
        left: node.offsetLeft + parent.left,
        width: node.offsetWidth,
        height: node.offsetHeight
    };
};

exports.parseBackgrounds = function(backgroundImage) {
    var whitespace = ' \r\n\t',
        method, definition, prefix, prefix_i, block, results = [],
        mode = 0, numParen = 0, quote, args;
    var appendResult = function() {
        if(method) {
            if (definition.substr(0, 1) === '"') {
                definition = definition.substr(1, definition.length - 2);
            }
            if (definition) {
                args.push(definition);
            }
            if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1 ) + 1) > 0) {
                prefix = method.substr(0, prefix_i);
                method = method.substr(prefix_i);
            }
            results.push({
                prefix: prefix,
                method: method.toLowerCase(),
                value: block,
                args: args,
                image: null
            });
        }
        args = [];
        method = prefix = definition = block = '';
    };
    args = [];
    method = prefix = definition = block = '';
    backgroundImage.split("").forEach(function(c) {
        if (mode === 0 && whitespace.indexOf(c) > -1) {
            return;
        }
        switch(c) {
        case '"':
            if(!quote) {
                quote = c;
            } else if(quote === c) {
                quote = null;
            }
            break;
        case '(':
            if(quote) {
                break;
            } else if(mode === 0) {
                mode = 1;
                block += c;
                return;
            } else {
                numParen++;
            }
            break;
        case ')':
            if (quote) {
                break;
            } else if(mode === 1) {
                if(numParen === 0) {
                    mode = 0;
                    block += c;
                    appendResult();
                    return;
                } else {
                    numParen--;
                }
            }
            break;

        case ',':
            if (quote) {
                break;
            } else if(mode === 0) {
                appendResult();
                return;
            } else if (mode === 1) {
                if (numParen === 0 && !method.match(/^url$/i)) {
                    args.push(definition);
                    definition = '';
                    block += c;
                    return;
                }
            }
            break;
        }

        block += c;
        if (mode === 0) {
            method += c;
        } else {
            definition += c;
        }
    });

    appendResult();
    return results;
};

},{}],27:[function(_dereq_,module,exports){
var GradientContainer = _dereq_('./gradientcontainer');

function WebkitGradientContainer(imageData) {
    GradientContainer.apply(this, arguments);
    this.type = imageData.args[0] === "linear" ? GradientContainer.TYPES.LINEAR : GradientContainer.TYPES.RADIAL;
}

WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);

module.exports = WebkitGradientContainer;

},{"./gradientcontainer":9}],28:[function(_dereq_,module,exports){
function XHR(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.statusText));
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}

module.exports = XHR;

},{}]},{},[4])(4)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"es6-promise":37}]},{},[40,41,89])