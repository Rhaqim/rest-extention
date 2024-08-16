use std::fs;
use regex::Regex;
use neon::prelude::*;

fn detect_methods_in_file(mut cx: FunctionContext) -> JsResult<JsString> {
    let file_path = cx.argument::<JsString>(0)?.value(&mut cx);
    let content = fs::read_to_string(file_path).expect("Unable to read file");

    let patterns = vec!["POST", "GET", "DELETE"];
    let pattern = format!(r"\b(?:{})\b", patterns.join("|"));
    let re = Regex::new(&pattern).unwrap();

    let mut matches = Vec::new();
    for mat in re.find_iter(&content) {
        matches.push(mat.as_str().to_string());
    }

    if matches.is_empty() {
        Ok(cx.string("No HTTP methods detected."))
    } else {
        let result = matches.join(", ");
        Ok(cx.string(result))
    }
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("detectMethodsInFile", detect_methods_in_file)?;
    Ok(())
}
