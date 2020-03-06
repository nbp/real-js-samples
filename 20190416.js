// This script runs multipe parsers from a single engine.

var dir = "20190416";
var mode = "script";
var runs_per_script = 1;

var name_1 = "SpiderMonkey parser";
function parse_1(path) {
    var start = performance.now();
    parse(path, { module: mode == "module", smoosh: false });
    return performance.now() - start;
}

var name_2 = "SmooshMonkey parser";
function parse_2(path) {
    var start = performance.now();
    parse(path, { module: mode == "module", smoosh: true });
    return performance.now() - start;
}

var path = "", content = "";
var t_1= 0, t_2 = 0, time_1 = 0, time_2 = 0;
var count = 0, count_bytes = 0, skipped = 0, skipped_bytes = 0;
var list = os.file.listDir(dir);
for (var file of list) {
    path = os.path.join(dir, file);
    content = "";
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
        skipped++;
        skipped_bytes += content.length;
    }
}

var total_bytes = count_bytes * runs_per_script;
print(name_1, "\t", time_1, "ms\t", 1e6 * time_1 / total_bytes, 'ns/byte\t', total_bytes / (1e6 * time_1), 'bytes/ns\t');
print(name_2, "\t", time_2, "ms\t", 1e6 * time_2 / total_bytes, 'ns/byte\t', total_bytes / (1e6 * time_2), 'bytes/ns\t');
print("Total parsed  (scripts:", count * runs_per_script, ", bytes:", total_bytes, ")");
print("Total skipped (scripts:", skipped * runs_per_script, ", bytes:", skipped_bytes, ")");
