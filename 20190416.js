// This script runs multipe parsers from a single engine.

var dir = "20190416";
var mode = "script";
var runs_per_script = 1;
var filter_out = [
    "sw.js",
    "1202200111%3Fmkt%3Den-GB%26it%3DZ%2CL%2CLA%26og%3D409%26cb%3DMicrosoft.Maps.NetworkCallbacks.normal%26jsonso%3D3c45c%26js%3D1%26tj%3D1%26lc%3D%26c4w%3D1%26vpt%3De%2Cp%2Cpg%26osm%3D1",
    "PushService.js%3F1904121404450000",
    "mi-header-b0fe301ee2.js",
    "pb.js",
    "runSlots.js%3F1555562304",
    "prebid.min.js",
    "perform-tracker.js",
    "PushNotifications.a520290f628c62e49e36.js",
    "rapid-4.1.0.js",
    "jquery.dataTables.min.js",
    "7ejto8kaax7zuhv5nc57auwzg",
    "%3F%3FunifiedSellerJoin.80d5b173.js",
    "similars.ru.42b6d4465b00704a12f2.js",
    "chpzgttpznxpdtzqz2ht7qszi",
    "CollectionCommentsPage%7ECommentsPage%7EExplore%7EFrontpage%7EGlobalModalContainer%7EGovernanceReleaseNotesMod%7E6b4ca950.8f64a551a0418ad1a0e9.js",
    "autoSuggest%3Fv%3DF52XdMdk0piA59c7u_89rpv2x4WlCoLkhMtE-E_oECc1",
    "VisitorAPI-2.5.0.js",
    "package.a6067778.js",
    "AmazonUI",
    "CollectionCommentsPage%7ECommentsPage%7EExplore%7EFrontpage%7EModListing%7EModQueuePages%7EModerationPages%7EMulti%7Ed27514f2.86f5add166bf17d69634.js",
    "8269159376.js",
    "pages.channel.components.channel-root.components.channel-videos-overview-page.components.channel-videos-overview-content-0f2355aa278fcdb8f565.js",
    "clipboard.min.js",
    "CollectionCommentsPage%7ECommentsPage%7EExplore%7EFrontpage%7EGovernanceReleaseNotesModal%7EModListing%7EModQueu%7Edb251346.3ae6a1f0718eac4668f4.js",
    "clc.min.js%3Fv%3D04d772c81312",
    "7rjl2yfb7xxc3z8ufg3soexr8",
    "430d3806.js%3Fbu%3DB_sEqQWrBa0F7QSwBYAF",
    "1e2c979707364fa.js",
    "ad-scripts.js",
    "CollectionCommentsPage%7ECommentsPage%7EExplore%7EFrontpage%7EGovernanceReleaseNotesModal%7EModListing%7EModQueu%7E1084d5fc.fc0dd8e4bc35d0c1945c.js",
    "live-text.js%3Fbust%3D201904181417",
    "jquery-1.7.2.min.js",
    "features.chat.components.native-broadcast-notification-185b7c68adf93a36bb86.js",
    "f3c4d0d4.js%3Fbu%3DBfsE4gyQDuoMgAU",
    "ajax_show_product_display.do%3Fcallback%3DjQuery1830999958668115817_1555590344934%26product_map%3D229529600-32964702672%26sellerCoupon%3Dy%26currency%3DUSD%26json%3Dy%26_csrf_token_%3D_fscu9o5x7tf%26_%3D1555590345654",
    "satellite-5b56ce6564746d43fa000c57.js",
    "jquery.js%3Fv%3D2014-10-22%3Aformatted",
    "pv-tracker.js",
    "jquery-1.7.1.min.js",
    "9cf446cab500af3b93584f38c46cda29",
    "pu.fs-v663178.js",
    "billing-c32a8856.js",
    "rapid-4.1.1.js",
    "Governance%7EReddit.6875c6bd21dbe27116cc.js",
    "1202022332%3Fmkt%3Den-GB%26it%3DZ%2CL%2CLA%26og%3D409%26cb%3DMicrosoft.Maps.NetworkCallbacks.normal%26jsonso%3D3c506%26js%3D1%26tj%3D1%26lc%3D%26c4w%3D1%26vpt%3De%2Cp%2Cpg%26osm%3D1",
    "stub.en.js%3Fv%3De0cc2402449f",
    "error-tracker.js",
    "satellite-5a095f3264746d153d0055ad.js",
    "mediaplayer.min.js",
    "mapcontrol%3Fpartner%3Dserp%26enableinstrumentation%3Dtrue%26callback%3DinitializeMap%26branch%3Dexperimental",
    "Chat%7EClient%7EGovernance%7EReddit.b021cab1e27eacd7021f.js",
    "jquery.iframetracker.js",
    "120220011012101%3Fmkt%3Den-GB%26it%3DZ%2CL%2CLA%26og%3D409%26cb%3DMicrosoft.Maps.NetworkCallbacks.normal%26jsonso%3D3d987%26js%3D1%26tj%3D1%26lc%3D%26c4w%3D1%26vpt%3De%2Cp%2Cpg%26osm%3D1",
    "9wchst544g0r4e4cfp3t5y3xk",
    "subset-trending-widget-2379256729._CB483349752_.js",
    "NotificationsPrePromptLoader.4c1df3f5a231c230d931.js",
    "1202022323%3Fmkt%3Den-GB%26it%3DZ%2CL%2CLA%26og%3D409%26cb%3DMicrosoft.Maps.NetworkCallbacks.normal%26jsonso%3D3c508%26js%3D1%26tj%3D1%26lc%3D%26c4w%3D1%26vpt%3De%2Cp%2Cpg%26osm%3D1",
    "GovernanceUserPublicPointsDisplay.7c5589e620a62cd96f7a.js",
    "6b7e3b89f452c058f0cb.chunk.js",
    "RetailSearchAssets%23121649-T2.153197-T1",
    "Governance%7EProfile%7EProfileHomepage%7EProfilePostComments%7ER2CommentsPage%7ER2Listing%7EReddit.e0f5b1fe377af2eccd80.js",
    "62g8j2ggq8j1djdrtz1q0wur6",
    "siteAllCategory.json%3Fcallback%3DjQuery18309251691631591454_1555590324650%26site%3Dglo%26_%3D1555590343369",
    "CollectionCommentsPage%7ECommentsPage%7EFrontpage%7EModListing%7EModQueuePages%7EModerationPages%7EMultireddit%7EN%7E0561de65.b553a30a1dc002e38208.js",
    "vendors.5e7496c2b427f4f7a387.js",
    "cookie-manipulation.js%3Fbust%3D201904181417",
    "c7xzim4rqypn6xyi9gh6hobx1",
    "module-loader.js%3Fbust%3D201904181417",
    "Client%7EGovernance%7EReddit.b1d9f3cb4e8dbde3ff96.js",
    "120210233222%3Fmkt%3Den-GB%26it%3DZ%2CL%2CLA%26og%3D409%26cb%3DMicrosoft.Maps.NetworkCallbacks.normal%26jsonso%3D3c83f%26js%3D1%26tj%3D1%26lc%3D%26c4w%3D1%26vpt%3De%2Cp%2Cpg%26osm%3D1",
    "Chat%7EGovernance%7EReddit%7ERedesignChat.55dab48bbc5c35a140f3.js",
    "player.js%3FlastModified%3D2019-04-04T03%3A32%3A08.376Z",
    "hls.plugin.min.js%3Fb%3DThu%2520Apr%252004%25202019%252007%253A19%253A14%2520GMT%252B0000%2520%28UTC%29",
    "vendors%7EGovernance%7EReddit.faa615b571967bf75e18.js",
    "ug5swannj2zhramycvq3mi4mwih.js",
    "propensity-score.f79347e82f97dd07fcf5.js",
    "stub.en.js%3Fv%3D647a7ec51224",
    "special-tracker.js",
    "bf.min.js",
    "jquery1.7.2.min.js",
    "config.js%3Fcustomer%3Dlci%26md5%3D64078-374aa037",
    "dashboard-bootstrap-7394fa5d.js",
    "wmd.en.js%3Fv%3Da6d75f03e0da",
    "rapid-4.0.2.js",
    "rezen-modal.6c581f519645eaa9945e.js",
    "thirdparty.js%3F1903131721122656",
    "421a0c09.js",
    "120220011%3Fmkt%3Den-GB%26it%3DZ%2CL%2CLA%26og%3D409%26cb%3DMicrosoft.Maps.NetworkCallbacks.normal%26jsonso%3D3a4cd%26js%3D1%26tj%3D1%26lc%3D%26c4w%3D1%26vpt%3De%2Cp%2Cpg%26osm%3D1",
    "ajax_show_product_display.do%3Fcallback%3DjQuery18304347846642398724_1555591645372%26product_map%3D230437894-32834416564%26sellerCoupon%3Dy%26currency%3DUSD%26json%3Dy%26_csrf_token_%3D_fscu9o5x7tf%26_%3D1555591648018",
    "octocaptcha-9003acb2.js",
    "1202022333%3Fmkt%3Den-GB%26it%3DZ%2CL%2CLA%26og%3D409%26cb%3DMicrosoft.Maps.NetworkCallbacks.normal%26jsonso%3D3c50a%26js%3D1%26tj%3D1%26lc%3D%26c4w%3D1%26vpt%3De%2Cp%2Cpg%26osm%3D1",
    "120210232333%3Fmkt%3Den-GB%26it%3DZ%2CL%2CLA%26og%3D409%26cb%3DMicrosoft.Maps.NetworkCallbacks.normal%26jsonso%3D3c859%26js%3D1%26tj%3D1%26lc%3D%26c4w%3D1%26vpt%3De%2Cp%2Cpg%26osm%3D1",
    "event-tracker.js",
    "1202200110%3Fmkt%3Den-GB%26it%3DZ%2CL%2CLA%26og%3D409%26cb%3DMicrosoft.Maps.NetworkCallbacks.normal%26jsonso%3D3c458%26js%3D1%26tj%3D1%26lc%3D%26c4w%3D1%26vpt%3De%2Cp%2Cpg%26osm%3D1",
    "wonderpush.js%3Fbust%3D201904181417",
    "rapid-4.0.3.js",
    "log.js",
    "1f92bfb4.js%3Fbu%3DBPsEjg2RDYAF",
    "pages.directory-game-ceaaacbe68b1df0cc139.js",
    "b4218405.js%3Fbu%3DB_sEqQWrBa0F7QSwBYAF",
    ".",
    ".."
];

var name_1 = "SpiderMonkey legacy parser";
function parse_1(path) {
    var start = performance.now();
    parse(path, { module: mode == "module", rustFrontend: false });
    return performance.now() - start;
}

var name_2 = "Vision experimental parser";
function parse_2(path) {
    var start = performance.now();
    parse(path, { module: mode == "module", rustFrontend: true });
    return performance.now() - start;
}

var path = "", content = "";
var t_1= 0, t_2 = 0, time_1 = 0, time_2 = 0, count = 0, count_bytes = 0;
var list = os.file.listDir(dir);
var f = 0;
for (var file of list) {
    f++;
    if (filter_out.includes(file)) {
        continue;
    }

    path = os.path.join(dir, file);
    try {
        // print(Math.round(100 * f / list.length), file);
        content = os.file.readRelativeToScript(path);
        for (var i = 0; i < runs_per_script; i++) {
            // Randomize the order in which parsers are executed as they are
            // executed in the same process and the parsed content might be
            // faster to load for the second parser as it is already in memory.
            if (Math.random() > 0.5) {
                t_1 = parse_1(content);
                t_2 = parse_2(content);
            } else {
                t_2 = parse_2(content);
                t_1 = parse_1(content);
            }
            time_1 += t_1;
            time_2 += t_2;
        }
        count++;
        count_bytes += content.length;
    } catch (e) {
        // ignore all errors for now.
    }
}

var total_bytes = count_bytes * runs_per_script;
print(name_1, "\t", time_1, "ms\t", 1e6 * time_1 / total_bytes, 'ns/byte\t', total_bytes / (1e6 * time_1), 'bytes/ns\t');
print(name_2, "\t", time_2, "ms\t", 1e6 * time_2 / total_bytes, 'ns/byte\t', total_bytes / (1e6 * time_2), 'bytes/ns\t');
print("Total number of bytes parsed:\t", total_bytes);
print("Total number of scripts parsed:\t", count * runs_per_script);
