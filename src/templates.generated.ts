// @ts-nocheck
export const precompiledTemplates: Record<string, unknown> = {}
precompiledTemplates["add_category.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "add_category.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <div class=\"d-flex justify-content-between align-items-center\">\n            <h1 class=\"h2\">添加类别</h1>\n            <a href=\"";
output += runtime.suppressValue((lineno = 7, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["categories"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-secondary\">\n                <i class=\"bi bi-arrow-left\"></i> 返回类别列表\n            </a>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-8\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h5 class=\"mb-0\">\n                    <i class=\"bi bi-plus-circle-fill\"></i> 类别信息\n                </h5>\n            </div>\n            <form method=\"POST\">\n                <div class=\"card-body\">\n                    <div class=\"mb-3\">\n                        <label for=\"name\" class=\"form-label\">类别名称 <span class=\"text-danger\">*</span></label>\n                        <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" required\n                               placeholder=\"请输入类别名称，如：作业、考试、纪律等\">\n                        <div class=\"form-text\">类别名称应该简洁明了，便于识别</div>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"description\" class=\"form-label\">类别描述</label>\n                        <textarea class=\"form-control\" id=\"description\" name=\"description\" rows=\"3\"\n                                  placeholder=\"请详细描述这个类别包含的内容和标准...\"></textarea>\n                        <div class=\"form-text\">详细描述有助于统一积分标准</div>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"default_points\" class=\"form-label\">默认积分值 <span class=\"text-danger\">*</span></label>\n                        <input type=\"number\" class=\"form-control\" id=\"default_points\" name=\"default_points\" required\n                               placeholder=\"请输入默认积分值\">\n                        <div class=\"form-text\">\n                            <span class=\"text-success\">正数</span> 表示默认加分，\n                            <span class=\"text-danger\">负数</span> 表示默认扣分\n                        </div>\n                    </div>\n\n                    <!-- 积分建议 -->\n                    <div class=\"alert alert-info\">\n                        <h6>常见类别积分建议：</h6>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <div class=\"d-flex justify-content-between mb-1\">\n                                    <span>作业完成：</span>\n                                    <span>+5 分</span>\n                                </div>\n                                <div class=\"d-flex justify-content-between mb-1\">\n                                    <span>作业未交：</span>\n                                    <span class=\"text-danger\">-3 分</span>\n                                </div>\n                                <div class=\"d-flex justify-content-between mb-1\">\n                                    <span>考试成绩优秀：</span>\n                                    <span>+10 分</span>\n                                </div>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <div class=\"d-flex justify-content-between mb-1\">\n                                    <span>课堂积极表现：</span>\n                                    <span>+2 分</span>\n                                </div>\n                                <div class=\"d-flex justify-content-between mb-1\">\n                                    <span>纪律良好：</span>\n                                    <span>+3 分</span>\n                                </div>\n                                <div class=\"d-flex justify-content-between mb-1\">\n                                    <span>违反纪律：</span>\n                                    <span class=\"text-danger\">-5 分</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"card-footer\">\n                    <button type=\"submit\" class=\"btn btn-primary\">\n                        <i class=\"bi bi-check-circle\"></i> 创建类别\n                    </button>\n                    <a href=\"";
output += runtime.suppressValue((lineno = 88, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["categories"])), env.opts.autoescape);
output += "\" class=\"btn btn-secondary ms-2\">\n                        <i class=\"bi bi-x-circle\"></i> 取消\n                    </a>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div class=\"col-md-4\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-info-circle-fill\"></i> 使用说明\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <ul class=\"list-unstyled\">\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-check-circle text-success\"></i>\n                        类别名称不能重复\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-check-circle text-success\"></i>\n                        默认积分会在添加记录时自动填入\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-check-circle text-success\"></i>\n                        描述信息有助于规范化管理\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-info-circle text-info\"></i>\n                        创建后可以编辑和删除类别\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n        <div class=\"card mt-3\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-lightbulb-fill\"></i> 最佳实践\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <div class=\"alert alert-warning\">\n                    <small>\n                        <strong>建议：</strong><br>\n                        • 类别名称简洁明了<br>\n                        • 积分值设置合理<br>\n                        • 描述详细具体<br>\n                        • 标准统一执行\n                    </small>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};
})();
precompiledTemplates["add_group.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "add_group.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <h1 class=\"h2\">\n            <i class=\"bi bi-plus-circle-fill text-primary\"></i> 添加小组\n        </h1>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-8\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h5 class=\"mb-0\">\n                    <i class=\"bi bi-collection-fill\"></i> 小组信息\n                </h5>\n            </div>\n            <form method=\"POST\">\n                <div class=\"card-body\">\n                    <div class=\"mb-3\">\n                        <label for=\"name\" class=\"form-label\">小组名称 <span class=\"text-danger\">*</span></label>\n                        <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" required\n                               placeholder=\"请输入小组名称，如：第一组、创新组等\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"class_name\" class=\"form-label\">所属班级 <span class=\"text-danger\">*</span></label>\n                        <input type=\"text\" class=\"form-control\" id=\"class_name\" name=\"class_name\" required\n                               placeholder=\"请输入班级名称\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"description\" class=\"form-label\">小组描述</label>\n                        <textarea class=\"form-control\" id=\"description\" name=\"description\" rows=\"3\"\n                                  placeholder=\"请输入小组描述或目标（选填）\"></textarea>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"color\" class=\"form-label\">小组颜色</label>\n                        <div class=\"d-flex align-items-center\">\n                            <input type=\"color\" class=\"form-control form-control-color me-3\"\n                                   id=\"color\" name=\"color\" value=\"#007bff\" style=\"width: 60px;\">\n                            <div class=\"flex-grow-1\">\n                                <div class=\"d-flex gap-2 flex-wrap\">\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #007bff;\"\n                                            onclick=\"setColor('#007bff')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #28a745;\"\n                                            onclick=\"setColor('#28a745')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #dc3545;\"\n                                            onclick=\"setColor('#dc3545')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #ffc107;\"\n                                            onclick=\"setColor('#ffc107')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #6f42c1;\"\n                                            onclick=\"setColor('#6f42c1')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #fd7e14;\"\n                                            onclick=\"setColor('#fd7e14')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #20c997;\"\n                                            onclick=\"setColor('#20c997')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #e83e8c;\"\n                                            onclick=\"setColor('#e83e8c')\">&nbsp;</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <!-- 预览 -->\n                    <div class=\"alert alert-light\">\n                        <h6 class=\"mb-2\">预览效果</h6>\n                        <div class=\"p-3 rounded\" id=\"preview\" style=\"background-color: #007bff20; border-left: 4px solid #007bff;\">\n                            <div class=\"d-flex align-items-center\">\n                                <i class=\"bi bi-collection-fill me-2\" style=\"color: #007bff;\"></i>\n                                <strong id=\"previewName\">小组名称</strong>\n                            </div>\n                            <small class=\"text-muted\" id=\"previewClass\">班级名称</small>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"card-footer\">\n                    <button type=\"submit\" class=\"btn btn-primary\">\n                        <i class=\"bi bi-check-circle\"></i> 创建小组\n                    </button>\n                    <a href=\"";
output += runtime.suppressValue((lineno = 84, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["groups"])), env.opts.autoescape);
output += "\" class=\"btn btn-secondary ms-2\">\n                        <i class=\"bi bi-x-circle\"></i> 取消\n                    </a>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div class=\"col-md-4\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-info-circle-fill\"></i> 使用说明\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <ul class=\"list-unstyled\">\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-check-circle text-success\"></i>\n                        小组用于班级内的团队协作和竞争\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-check-circle text-success\"></i>\n                        可以为学生分配小组，统计小组平均分\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-info-circle text-info\"></i>\n                        选择合适的颜色便于区分不同小组\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-info-circle text-info\"></i>\n                        小组描述可以说明小组目标或特色\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n        <div class=\"card mt-3\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-lightbulb-fill\"></i> 小组建议\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <h6>常见小组类型：</h6>\n                <ul class=\"list-unstyled\">\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-star text-warning\"></i>\n                        <strong>学习小组：</strong>按学习成绩分组\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-star text-warning\"></i>\n                        <strong>兴趣小组：</strong>按兴趣爱好分组\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-star text-warning\"></i>\n                        <strong>竞赛小组：</strong>用于各种竞赛活动\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-star text-warning\"></i>\n                        <strong>值日小组：</strong>轮流负责班级事务\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 153;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script>\ndocument.addEventListener('DOMContentLoaded', function() {\n    const nameInput = document.getElementById('name');\n    const classInput = document.getElementById('class_name');\n    const colorInput = document.getElementById('color');\n    const preview = document.getElementById('preview');\n    const previewName = document.getElementById('previewName');\n    const previewClass = document.getElementById('previewClass');\n\n    function updatePreview() {\n        const name = nameInput.value || '小组名称';\n        const className = classInput.value || '班级名称';\n        const color = colorInput.value;\n\n        previewName.textContent = name;\n        previewClass.textContent = className;\n        preview.style.backgroundColor = color + '20';\n        preview.style.borderLeftColor = color;\n        preview.querySelector('i').style.color = color;\n    }\n\n    nameInput.addEventListener('input', updatePreview);\n    classInput.addEventListener('input', updatePreview);\n    colorInput.addEventListener('change', updatePreview);\n});\n\nfunction setColor(color) {\n    document.getElementById('color').value = color;\n    document.getElementById('color').dispatchEvent(new Event('change'));\n}\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};
})();
precompiledTemplates["add_points.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "add_points.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container-fluid\">\n    <!-- 页面头部 -->\n    <div class=\"row mb-3 mb-md-4\">\n        <div class=\"col-12\">\n            <div class=\"d-flex justify-content-between align-items-center\">\n                <div class=\"d-flex justify-content-between align-items-center w-100\">\n                    <div>\n                        <h1 class=\"h2 mb-1\">\n                            <i class=\"bi bi-people-fill text-primary\"></i> 快速积分\n                        </h1>\n                        <p class=\"text-muted mb-0 d-none d-md-block\">点击学生卡片快速录入积分</p>\n                    </div>\n                    <div>\n                        <div class=\"d-none d-md-inline-block\">\n                            <a href=\"";
output += runtime.suppressValue((lineno = 17, colno = 47, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["import_points"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-success me-2\">\n                                <i class=\"bi bi-file-earmark-spreadsheet\"></i> 批量导入\n                            </a>\n                            <a href=\"";
output += runtime.suppressValue((lineno = 20, colno = 47, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["points_records"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-secondary\">\n                                <i class=\"bi bi-arrow-left\"></i> 记录列表\n                            </a>\n                        </div>\n                        <!-- 移动端提交按钮 (现在独立固定在右上角) -->\n                        <button type=\"button\" class=\"btn btn-primary d-md-none mobile-btn-fixed\" data-bs-toggle=\"modal\"\n                            data-bs-target=\"#mobileOpsModal\">\n                            <i class=\"bi bi-plus-circle\"></i> 操作\n                            <span class=\"badge bg-white text-primary ms-1\" id=\"mobileSelectedCount\">0</span>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <!-- 左侧：学生卡片网格 -->\n        <div class=\"col-lg-9\">\n            <!-- 筛选与控制 (移动端大幅精简) -->\n            <div class=\"row mb-3 mb-md-4\">\n                <div class=\"col-12\">\n                    <div class=\"d-flex justify-content-between align-items-center\">\n                        <div class=\"btn-group d-none d-md-flex\" role=\"group\">\n                            <button type=\"button\" class=\"btn btn-outline-primary active\" data-filter=\"all\">\n                                <i class=\"bi bi-people-fill\"></i> 全部学生\n                            </button>\n                            <button type=\"button\" class=\"btn btn-outline-primary\" data-filter=\"grouped\">\n                                <i class=\"bi bi-collection-fill\"></i> 已分组\n                            </button>\n                            <button type=\"button\" class=\"btn btn-outline-primary\" data-filter=\"ungrouped\">\n                                <i class=\"bi bi-person-x\"></i> 未分组\n                            </button>\n                        </div>\n                        <div class=\"flex-grow-1 d-md-none\"><!-- 移动端占位 --></div>\n                        <div>\n                            <button type=\"button\" class=\"btn btn-outline-secondary btn-sm\" id=\"selectAllBtn\">\n                                <i class=\"bi bi-check-all\"></i> 全选\n                            </button>\n                            <button type=\"button\" class=\"btn btn-outline-secondary btn-sm\" id=\"clearAllBtn\">\n                                <i class=\"bi bi-x-circle\"></i> 清除\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- 按小组展示学生 -->\n            <div id=\"studentsGrid\">\n                <!-- 已分组的学生 -->\n                ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "groups_with_students");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("group_data", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                ";
if(runtime.memberLookup((t_11),"students")) {
output += "\n                <div class=\"group-section mb-4\" data-group-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"group")),"id"), env.opts.autoescape);
output += "\">\n                    <div class=\"group-header mb-2 mb-md-3 p-2 p-md-3 rounded\"\n                        style=\"background-color: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"group")),"color"), env.opts.autoescape);
output += "20; border-left: 4px solid ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"group")),"color"), env.opts.autoescape);
output += ";\">\n                        <div class=\"d-flex justify-content-between align-items-center\">\n                            <div>\n                                <h5 class=\"mb-0 mb-md-1\">\n                                    <i class=\"bi bi-collection-fill\" style=\"color: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"group")),"color"), env.opts.autoescape);
output += ";\"></i>\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"group")),"name"), env.opts.autoescape);
output += "\n                                </h5>\n                                <small class=\"text-muted d-none d-md-block\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"group")),"description"), env.opts.autoescape);
output += " |\n                                    ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((t_11),"students")), env.opts.autoescape);
output += " 名学生 |\n                                    小组总分: ";
output += runtime.suppressValue((lineno = 84, colno = 74, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_11),"group")),"total_points"), "group_data[\"group\"][\"total_points\"]", context, [])), env.opts.autoescape);
output += " |\n                                    小组平均分: ";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",(lineno = 85, colno = 91, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_11),"group")),"average_points"), "group_data[\"group\"][\"average_points\"]", context, []))), env.opts.autoescape);
output += "\n                                </small>\n                            </div>\n                            <div class=\"group-controls\">\n                                <button type=\"button\" class=\"btn btn-sm btn-outline-secondary group-select-all\"\n                                    data-group-id=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"group")),"id"), env.opts.autoescape);
output += "\">\n                                    <i class=\"bi bi-check-all\"></i> <span class=\"d-none d-md-inline\">全选本组</span><span\n                                        class=\"d-md-none\">全选</span>\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 g-2 g-md-3\">\n                        ";
frame = frame.push();
var t_14 = runtime.memberLookup((t_11),"students");
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("student", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n                        <div class=\"col student-card-wrapper\" data-student-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"id"), env.opts.autoescape);
output += "\"\n                            data-student-name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "\" data-current-points=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"total_points") || 0, env.opts.autoescape);
output += "\"\n                            data-group-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"group_id") || "", env.opts.autoescape);
output += "\" data-filter-type=\"grouped\">\n                            <div class=\"student-card h-100 position-relative\">\n                                <div class=\"card h-100 border-0 shadow-sm student-card-inner\">\n                                    <div class=\"card-body text-center p-2 p-sm-3\">\n                                        <!-- 学生头像 -->\n                                        <div class=\"student-avatar mb-1 mb-md-2\">\n                                            <img src=\"";
output += runtime.suppressValue((lineno = 107, colno = 67, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "avatar_url"), "avatar_url", context, [runtime.memberLookup((t_15),"id")])), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "\"\n                                                class=\"avatar avatar-sm avatar-md-lg\">\n                                        </div>\n\n                                        <!-- 学生信息 -->\n                                        <h6 class=\"student-name mb-1 text-truncate\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "</h6>\n                                        <div class=\"current-points\">\n                                            <span class=\"badge bg-light text-dark small p-1\">\n                                                <span class=\"points-value\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"total_points") || 0, env.opts.autoescape);
output += "</span>\n                                            </span>\n                                        </div>\n\n                                        <!-- 选中标记 (隐藏但由 JS 操作) -->\n                                        <input class=\"form-check-input student-checkbox d-none\" type=\"checkbox\"\n                                            value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"id"), env.opts.autoescape);
output += "\" id=\"student";
output += runtime.suppressValue(runtime.memberLookup((t_15),"id"), env.opts.autoescape);
output += "\">\n\n                                        <div\n                                            class=\"selection-indicator position-absolute top-0 end-0 p-1 p-md-2 d-none\">\n                                            <i class=\"bi bi-check-circle-fill text-primary\"></i>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                </div>\n                ";
;
}
output += "\n                ";
;
}
}
frame = frame.pop();
output += "\n\n                <!-- 未分组的学生 -->\n                ";
if(runtime.contextOrFrameLookup(context, frame, "ungrouped_students")) {
output += "\n                <div class=\"group-section mb-4\" data-group-id=\"ungrouped\">\n                    <div class=\"group-header mb-2 mb-md-3 p-2 p-md-3 rounded bg-light\"\n                        style=\"border-left: 4px solid #6c757d;\">\n                        <div class=\"d-flex justify-content-between align-items-center\">\n                            <div>\n                                <h5 class=\"mb-0 mb-md-1\">\n                                    <i class=\"bi bi-person-x text-muted\"></i>\n                                    未分组学生\n                                </h5>\n                                <small class=\"text-muted d-none d-md-block\">\n                                    ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "ungrouped_students")), env.opts.autoescape);
output += " 名学生\n                                </small>\n                            </div>\n                            <div class=\"group-controls\">\n                                <button type=\"button\" class=\"btn btn-sm btn-outline-secondary group-select-all\"\n                                    data-group-id=\"ungrouped\">\n                                    <i class=\"bi bi-check-all\"></i> <span class=\"d-none d-md-inline\">全选本组</span><span\n                                        class=\"d-md-none\">全选</span>\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 g-2 g-md-3\">\n                        ";
frame = frame.push();
var t_18 = runtime.contextOrFrameLookup(context, frame, "ungrouped_students");
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_17 = t_18.length;
for(var t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16];
frame.set("student", t_19);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n                        <div class=\"col student-card-wrapper\" data-student-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_19),"id"), env.opts.autoescape);
output += "\"\n                            data-student-name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "\" data-current-points=\"";
output += runtime.suppressValue(runtime.memberLookup((t_19),"total_points") || 0, env.opts.autoescape);
output += "\"\n                            data-group-id=\"\" data-filter-type=\"ungrouped\">\n                            <div class=\"student-card h-100 position-relative\">\n                                <div class=\"card h-100 border-0 shadow-sm student-card-inner\">\n                                    <div class=\"card-body text-center p-2 p-sm-3\">\n                                        <!-- 学生头像 -->\n                                        <div class=\"student-avatar mb-1 mb-md-2\">\n                                            <img src=\"";
output += runtime.suppressValue((lineno = 171, colno = 67, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "avatar_url"), "avatar_url", context, [runtime.memberLookup((t_19),"id")])), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "\"\n                                                class=\"avatar avatar-sm avatar-md-lg\">\n                                        </div>\n\n                                        <!-- 学生信息 -->\n                                        <h6 class=\"student-name mb-1 text-truncate\">";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "</h6>\n                                        <div class=\"current-points\">\n                                            <span class=\"badge bg-light text-dark small p-1\">\n                                                <span class=\"points-value\">";
output += runtime.suppressValue(runtime.memberLookup((t_19),"total_points") || 0, env.opts.autoescape);
output += "</span>\n                                            </span>\n                                        </div>\n\n                                        <!-- 选中标记 -->\n                                        <input class=\"form-check-input student-checkbox d-none\" type=\"checkbox\"\n                                            value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_19),"id"), env.opts.autoescape);
output += "\" id=\"student";
output += runtime.suppressValue(runtime.memberLookup((t_19),"id"), env.opts.autoescape);
output += "\">\n\n                                        <div\n                                            class=\"selection-indicator position-absolute top-0 end-0 p-1 p-md-2 d-none\">\n                                            <i class=\"bi bi-check-circle-fill text-primary\"></i>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                </div>\n                ";
;
}
output += "\n            </div>\n        </div>\n\n        <!-- 右侧：积分操作面板 (PC端显示，移动端隐藏) -->\n        <div class=\"col-lg-3 d-none d-lg-block\">\n            <div class=\"card sticky-top\" style=\"top: 20px;\">\n                <div class=\"card-header bg-primary text-white\">\n                    <h5 class=\"card-title mb-0\">\n                        <i class=\"bi bi-plus-circle\"></i> 积分操作\n                    </h5>\n                </div>\n                <div class=\"card-body\">\n                    <!-- 积分值设置 -->\n                    <div class=\"mb-4\">\n                        <label class=\"form-label fw-bold\">积分值</label>\n                        <div class=\"input-group mb-2\">\n                            <span class=\"input-group-text\">积分</span>\n                            <input type=\"number\" class=\"form-control\" id=\"customPointsValue\" placeholder=\"输入积分值\"\n                                value=\"1\" min=\"-100\" max=\"100\">\n                            <button class=\"btn btn-outline-success\" type=\"button\" id=\"setCustomPoints\">\n                                <i class=\"bi bi-check-circle\"></i> 设定\n                            </button>\n                        </div>\n\n                    </div>\n\n                    <!-- 类别和事由 -->\n                    <div class=\"mb-4\">\n                        <label class=\"form-label fw-bold\">类别</label>\n                        <select class=\"form-select\" id=\"quickCategory\">\n                            <option value=\"\">请选择类别</option>\n                            ";
frame = frame.push();
var t_22 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("category", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\n                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_23),"name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_23),"name"), env.opts.autoescape);
output += "</option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                            <option value=\"自定义\">自定义</option>\n                        </select>\n                    </div>\n\n                    <div class=\"mb-4\">\n                        <label class=\"form-label fw-bold\">事由</label>\n                        <input type=\"text\" class=\"form-control\" id=\"quickReason\" placeholder=\"请输入事由\">\n                    </div>\n\n                    <!-- 操作按钮 -->\n                    <div class=\"d-grid gap-2\">\n                        <button type=\"button\" class=\"btn btn-success btn-lg\" id=\"quickAddBtn\">\n                            <i class=\"bi bi-plus-circle\"></i> 加分\n                        </button>\n                        <button type=\"button\" class=\"btn btn-danger btn-lg\" id=\"quickMinusBtn\">\n                            <i class=\"bi bi-dash-circle\"></i> 扣分\n                        </button>\n                    </div>\n\n                    <!-- 选中状态 -->\n                    <div class=\"mt-4 p-3 bg-light rounded\">\n                        <div class=\"text-center\">\n                            <small class=\"text-muted\">已选择</small>\n                            <h4 id=\"selectedCount\" class=\"text-primary mb-1\">0</h4>\n                            <small class=\"text-muted\">名学生</small>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n\n<!-- 快速积分模态框 -->\n<div class=\"modal fade\" id=\"quickPointsModal\" tabindex=\"-1\">\n    <div class=\"modal-dialog modal-dialog-centered\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header border-0\">\n                <h5 class=\"modal-title\">\n                    <i class=\"bi bi-person-circle text-primary\"></i>\n                    <span id=\"modalStudentName\"></span>\n                </h5>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <form id=\"quickPointsForm\">\n                    <input type=\"hidden\" id=\"modalStudentId\" name=\"student_id\">\n\n                    <!-- 当前积分显示 -->\n                    <div class=\"text-center mb-4\">\n                        <div class=\"current-points-display\">\n                            <small class=\"text-muted\">当前积分</small>\n                            <h2 class=\"mb-0\">\n                                <span id=\"modalCurrentPoints\" class=\"text-primary\">0</span>\n                                <small class=\"text-muted\">分</small>\n                            </h2>\n                        </div>\n                    </div>\n\n                    <!-- 快捷积分选项 -->\n                    <div class=\"row mb-3\">\n                        <div class=\"col-6\">\n                            <label class=\"form-label text-success\">加分</label>\n                            <div class=\"d-grid gap-2\">\n                                <button type=\"button\" class=\"btn btn-success quick-add-points\" data-points=\"1\">+1\n                                    分</button>\n                                <button type=\"button\" class=\"btn btn-success quick-add-points\" data-points=\"2\">+2\n                                    分</button>\n                                <button type=\"button\" class=\"btn btn-success quick-add-points\" data-points=\"5\">+5\n                                    分</button>\n                                <button type=\"button\" class=\"btn btn-success quick-add-points\" data-points=\"10\">+10\n                                    分</button>\n                            </div>\n                        </div>\n                        <div class=\"col-6\">\n                            <label class=\"form-label text-danger\">扣分</label>\n                            <div class=\"d-grid gap-2\">\n                                <button type=\"button\" class=\"btn btn-danger quick-add-points\" data-points=\"-1\">-1\n                                    分</button>\n                                <button type=\"button\" class=\"btn btn-danger quick-add-points\" data-points=\"-2\">-2\n                                    分</button>\n                                <button type=\"button\" class=\"btn btn-danger quick-add-points\" data-points=\"-5\">-5\n                                    分</button>\n                                <button type=\"button\" class=\"btn btn-danger quick-add-points\" data-points=\"-10\">-10\n                                    分</button>\n                            </div>\n                        </div>\n                    </div>\n\n                    <!-- 自定义积分 -->\n                    <div class=\"mb-3\">\n                        <label for=\"customPoints\" class=\"form-label\">自定义积分</label>\n                        <input type=\"number\" class=\"form-control form-control-lg text-center\" id=\"customPoints\"\n                            placeholder=\"输入积分值\" min=\"-100\" max=\"100\">\n                    </div>\n\n                    <!-- 类别和事由 -->\n                    <div class=\"mb-3\">\n                        <label for=\"modalCategory\" class=\"form-label\">类别</label>\n                        <select class=\"form-select\" id=\"modalCategory\" name=\"category\">\n                            <option value=\"\">请选择类别</option>\n                            ";
frame = frame.push();
var t_26 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_26) {t_26 = runtime.fromIterator(t_26);
var t_25 = t_26.length;
for(var t_24=0; t_24 < t_26.length; t_24++) {
var t_27 = t_26[t_24];
frame.set("category", t_27);
frame.set("loop.index", t_24 + 1);
frame.set("loop.index0", t_24);
frame.set("loop.revindex", t_25 - t_24);
frame.set("loop.revindex0", t_25 - t_24 - 1);
frame.set("loop.first", t_24 === 0);
frame.set("loop.last", t_24 === t_25 - 1);
frame.set("loop.length", t_25);
output += "\n                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_27),"name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_27),"name"), env.opts.autoescape);
output += "</option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"modalReason\" class=\"form-label\">事由</label>\n                        <textarea class=\"form-control\" id=\"modalReason\" name=\"reason\" rows=\"2\"\n                            placeholder=\"请说明积分事由\"></textarea>\n                    </div>\n\n                    <!-- 操作人 -->\n                    <div class=\"mb-3\">\n                        <label for=\"modalOperator\" class=\"form-label\">操作人</label>\n                        <input type=\"text\" class=\"form-control\" id=\"modalOperator\" name=\"operator\"\n                            placeholder=\"请输入操作人姓名\">\n                    </div>\n                </form>\n            </div>\n            <div class=\"modal-footer border-0\">\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">取消</button>\n                <button type=\"button\" class=\"btn btn-primary\" id=\"submitQuickPoints\">\n                    <i class=\"bi bi-check-circle\"></i> 确认提交\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- 传统表单模态框 -->\n<div class=\"modal fade\" id=\"traditionalModal\" tabindex=\"-1\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">传统积分录入</h5>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <form method=\"POST\" id=\"traditionalForm\">\n                    <div class=\"mb-3\">\n                        <label for=\"tradStudentId\" class=\"form-label\">学生 <span class=\"text-danger\">*</span></label>\n                        <select class=\"form-select\" id=\"tradStudentId\" name=\"student_id\" required>\n                            <option value=\"\">请选择学生</option>\n                            ";
frame = frame.push();
var t_30 = runtime.contextOrFrameLookup(context, frame, "groups_with_students");
if(t_30) {t_30 = runtime.fromIterator(t_30);
var t_29 = t_30.length;
for(var t_28=0; t_28 < t_30.length; t_28++) {
var t_31 = t_30[t_28];
frame.set("group_data", t_31);
frame.set("loop.index", t_28 + 1);
frame.set("loop.index0", t_28);
frame.set("loop.revindex", t_29 - t_28);
frame.set("loop.revindex0", t_29 - t_28 - 1);
frame.set("loop.first", t_28 === 0);
frame.set("loop.last", t_28 === t_29 - 1);
frame.set("loop.length", t_29);
output += "\n                            ";
frame = frame.push();
var t_34 = runtime.memberLookup((t_31),"students");
if(t_34) {t_34 = runtime.fromIterator(t_34);
var t_33 = t_34.length;
for(var t_32=0; t_32 < t_34.length; t_32++) {
var t_35 = t_34[t_32];
frame.set("student", t_35);
frame.set("loop.index", t_32 + 1);
frame.set("loop.index0", t_32);
frame.set("loop.revindex", t_33 - t_32);
frame.set("loop.revindex0", t_33 - t_32 - 1);
frame.set("loop.first", t_32 === 0);
frame.set("loop.last", t_32 === t_33 - 1);
frame.set("loop.length", t_33);
output += "\n                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_35),"id"), env.opts.autoescape);
output += "\">\n                                ";
output += runtime.suppressValue(runtime.memberLookup((t_35),"name"), env.opts.autoescape);
output += " (";
output += runtime.suppressValue(runtime.memberLookup((t_35),"student_id"), env.opts.autoescape);
output += ") - ";
output += runtime.suppressValue(runtime.memberLookup((t_35),"class_name"), env.opts.autoescape);
output += " - ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_31),"group")),"name"), env.opts.autoescape);
output += "\n                            </option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                            ";
;
}
}
frame = frame.pop();
output += "\n                            ";
frame = frame.push();
var t_38 = runtime.contextOrFrameLookup(context, frame, "ungrouped_students");
if(t_38) {t_38 = runtime.fromIterator(t_38);
var t_37 = t_38.length;
for(var t_36=0; t_36 < t_38.length; t_36++) {
var t_39 = t_38[t_36];
frame.set("student", t_39);
frame.set("loop.index", t_36 + 1);
frame.set("loop.index0", t_36);
frame.set("loop.revindex", t_37 - t_36);
frame.set("loop.revindex0", t_37 - t_36 - 1);
frame.set("loop.first", t_36 === 0);
frame.set("loop.last", t_36 === t_37 - 1);
frame.set("loop.length", t_37);
output += "\n                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_39),"id"), env.opts.autoescape);
output += "\">\n                                ";
output += runtime.suppressValue(runtime.memberLookup((t_39),"name"), env.opts.autoescape);
output += " (";
output += runtime.suppressValue(runtime.memberLookup((t_39),"student_id"), env.opts.autoescape);
output += ") - ";
output += runtime.suppressValue(runtime.memberLookup((t_39),"class_name"), env.opts.autoescape);
output += " - 未分组\n                            </option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"mb-3\">\n                                <label for=\"tradPoints\" class=\"form-label\">积分值 <span\n                                        class=\"text-danger\">*</span></label>\n                                <input type=\"number\" class=\"form-control\" id=\"tradPoints\" name=\"points\" required>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div class=\"mb-3\">\n                                <label for=\"tradCategory\" class=\"form-label\">类别 <span\n                                        class=\"text-danger\">*</span></label>\n                                <select class=\"form-select\" id=\"tradCategory\" name=\"category\" required>\n                                    <option value=\"\">请选择类别</option>\n                                    ";
frame = frame.push();
var t_42 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_42) {t_42 = runtime.fromIterator(t_42);
var t_41 = t_42.length;
for(var t_40=0; t_40 < t_42.length; t_40++) {
var t_43 = t_42[t_40];
frame.set("category", t_43);
frame.set("loop.index", t_40 + 1);
frame.set("loop.index0", t_40);
frame.set("loop.revindex", t_41 - t_40);
frame.set("loop.revindex0", t_41 - t_40 - 1);
frame.set("loop.first", t_40 === 0);
frame.set("loop.last", t_40 === t_41 - 1);
frame.set("loop.length", t_41);
output += "\n                                    <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_43),"name"), env.opts.autoescape);
output += "\"\n                                        data-default-points=\"";
output += runtime.suppressValue(runtime.memberLookup((t_43),"default_points"), env.opts.autoescape);
output += "\">\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((t_43),"name"), env.opts.autoescape);
output += "\n                                    </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"tradReason\" class=\"form-label\">事由</label>\n                        <textarea class=\"form-control\" id=\"tradReason\" name=\"reason\" rows=\"3\"></textarea>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"tradOperator\" class=\"form-label\">操作人</label>\n                        <input type=\"text\" class=\"form-control\" id=\"tradOperator\" name=\"operator\">\n                    </div>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">取消</button>\n                <button type=\"button\" class=\"btn btn-primary\" id=\"submitTraditional\">提交</button>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- 移动端积分操作模态框 -->\n<div class=\"modal fade\" id=\"mobileOpsModal\" tabindex=\"-1\">\n    <div class=\"modal-dialog modal-dialog-centered\">\n        <div class=\"modal-content border-0 shadow-lg\">\n            <div class=\"modal-header bg-primary text-white\">\n                <h5 class=\"modal-title\">\n                    <i class=\"bi bi-plus-circle\"></i> 批量积分操作\n                    <span class=\"badge bg-white text-primary ms-1\" id=\"modalSelectedCountDisp\">0</span>\n                </h5>\n                <button type=\"button\" class=\"btn-close btn-close-white\" data-bs-dismiss=\"modal\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <!-- 积分值设置 -->\n                <div class=\"mb-4\">\n                    <label class=\"form-label fw-bold small text-muted\">积分值</label>\n                    <div class=\"input-group\">\n                        <input type=\"number\" class=\"form-control form-control-lg text-center\" id=\"mobileCustomPoints\"\n                            placeholder=\"数值\" value=\"1\" min=\"-100\" max=\"100\">\n                    </div>\n                </div>\n\n                <!-- 类别和事由 -->\n                <div class=\"mb-3\">\n                    <label class=\"form-label fw-bold small text-muted\">类别</label>\n                    <select class=\"form-select\" id=\"mobileQuickCategory\">\n                        <option value=\"\">请选择类别</option>\n                        ";
frame = frame.push();
var t_46 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_46) {t_46 = runtime.fromIterator(t_46);
var t_45 = t_46.length;
for(var t_44=0; t_44 < t_46.length; t_44++) {
var t_47 = t_46[t_44];
frame.set("category", t_47);
frame.set("loop.index", t_44 + 1);
frame.set("loop.index0", t_44);
frame.set("loop.revindex", t_45 - t_44);
frame.set("loop.revindex0", t_45 - t_44 - 1);
frame.set("loop.first", t_44 === 0);
frame.set("loop.last", t_44 === t_45 - 1);
frame.set("loop.length", t_45);
output += "\n                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_47),"name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_47),"name"), env.opts.autoescape);
output += "</option>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                        <option value=\"自定义\">自定义</option>\n                    </select>\n                </div>\n\n                <div class=\"mb-4\">\n                    <label class=\"form-label fw-bold small text-muted\">事由</label>\n                    <input type=\"text\" class=\"form-control\" id=\"mobileQuickReason\" placeholder=\"请输入事由\">\n                </div>\n\n                <!-- 操作按钮 -->\n                <div class=\"row g-2\">\n                    <div class=\"col-6\">\n                        <button type=\"button\" class=\"btn btn-success btn-lg w-100 py-3\" id=\"mobileQuickAddBtn\">\n                            <i class=\"bi bi-plus-circle\"></i> 加分\n                        </button>\n                    </div>\n                    <div class=\"col-6\">\n                        <button type=\"button\" class=\"btn btn-danger btn-lg w-100 py-3\" id=\"mobileQuickMinusBtn\">\n                            <i class=\"bi bi-dash-circle\"></i> 扣分\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 495;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<style>\n    /* 学生卡片样式 */\n    .student-card {\n        cursor: pointer;\n        transition: all 0.3s ease;\n    }\n\n    .student-card:hover .student-card-inner {\n        transform: translateY(-5px);\n        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n    }\n\n    .student-card.selected .student-card-inner {\n        border: 2px solid #0d6efd;\n        transform: translateY(-3px);\n    }\n\n    .avatar-md-lg {\n        width: 60px;\n        height: 60px;\n    }\n\n    @media (max-width: 576px) {\n        .avatar-sm {\n            width: 40px;\n            height: 40px;\n        }\n    }\n\n    @media (max-width: 768px) {\n        .mobile-btn-fixed {\n            position: fixed;\n            top: 15px;\n            right: 15px;\n            z-index: 1050;\n            /* 高于普通粘性元素 */\n            box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3) !important;\n            border-radius: 50px !important;\n            padding: 8px 16px !important;\n            background: rgba(13, 110, 253, 0.9) !important;\n            backdrop-filter: blur(5px);\n            -webkit-backdrop-filter: blur(5px);\n        }\n    }\n\n    .student-card.selected .selection-indicator {\n        display: block !important;\n    }\n\n    .student-card.selected .student-card-inner {\n        background-color: #f0f7ff;\n        border: 1px solid #0d6efd !important;\n    }\n\n    .avatar-circle {\n        width: 60px;\n        height: 60px;\n        border-radius: 50%;\n        font-size: 24px;\n        font-weight: bold;\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    }\n\n    .bg-gradient-primary {\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    }\n\n    .points-animation {\n        animation: pointsChange 0.6s ease-in-out;\n    }\n\n    @keyframes pointsChange {\n        0% {\n            transform: scale(1);\n        }\n\n        50% {\n            transform: scale(1.3);\n            color: #28a745;\n        }\n\n        100% {\n            transform: scale(1);\n        }\n    }\n\n    .points-negative-animation {\n        animation: pointsNegativeChange 0.6s ease-in-out;\n    }\n\n    @keyframes pointsNegativeChange {\n        0% {\n            transform: scale(1);\n        }\n\n        50% {\n            transform: scale(1.3);\n            color: #dc3545;\n        }\n\n        100% {\n            transform: scale(1);\n        }\n    }\n\n    .quick-points-btn:hover {\n        transform: scale(1.1);\n        transition: all 0.2s ease;\n    }\n\n    /* 小组头部样式 */\n    .group-header {\n        transition: all 0.3s ease;\n    }\n\n    .group-header:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n    }\n\n    .group-controls {\n        opacity: 0.7;\n        transition: opacity 0.3s ease;\n    }\n\n    .group-section:hover .group-controls {\n        opacity: 1;\n    }\n\n    /* 响应式调整 */\n    @media (max-width: 768px) {\n        .avatar-circle {\n            width: 50px;\n            height: 50px;\n            font-size: 20px;\n        }\n\n        .group-header {\n            padding: 1rem !important;\n        }\n\n        .group-header h5 {\n            font-size: 1.1rem;\n        }\n    }\n</style>\n\n<script>\n    document.addEventListener('DOMContentLoaded', function () {\n        let selectedStudents = new Set();\n        let currentFilter = 'all';\n\n        const quickPointsModal = new bootstrap.Modal(document.getElementById('quickPointsModal'));\n        const traditionalModal = new bootstrap.Modal(document.getElementById('traditionalModal'));\n\n        // 自定义积分值设定\n        document.getElementById('setCustomPoints').addEventListener('click', function () {\n            const points = parseInt(document.getElementById('customPointsValue').value) || 0;\n            if (points !== 0) {\n                showNotification(`已设定积分值：${points > 0 ? '+' : ''}${points}分`, 'success');\n            }\n        });\n\n\n        // 筛选按钮事件\n        document.querySelectorAll('[data-filter]').forEach(btn => {\n            btn.addEventListener('click', function () {\n                const filter = this.dataset.filter;\n                currentFilter = filter;\n\n                // 更新按钮状态\n                document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));\n                this.classList.add('active');\n\n                // 筛选学生卡片\n                filterStudents(filter);\n            });\n        });\n\n        // 筛选学生函数\n        function filterStudents(filter) {\n            const sections = document.querySelectorAll('.group-section');\n            const cards = document.querySelectorAll('.student-card-wrapper');\n\n            sections.forEach(section => {\n                if (filter === 'all') {\n                    section.style.display = 'block';\n                } else if (filter === 'grouped') {\n                    section.style.display = section.dataset.groupId !== 'ungrouped' ? 'block' : 'none';\n                } else if (filter === 'ungrouped') {\n                    section.style.display = section.dataset.groupId === 'ungrouped' ? 'block' : 'none';\n                }\n            });\n\n            // 同时更新单个卡片的显示状态，确保筛选一致性\n            cards.forEach(card => {\n                if (filter === 'all') {\n                    card.style.display = 'block';\n                } else if (filter === 'grouped') {\n                    card.style.display = card.dataset.groupId ? 'block' : 'none';\n                } else if (filter === 'ungrouped') {\n                    card.style.display = card.dataset.groupId ? 'none' : 'block';\n                }\n            });\n        }\n\n        // 点击学生卡片选择\n        document.querySelectorAll('.student-card').forEach(card => {\n            card.addEventListener('click', function (e) {\n                // 如果点击的是已经存在的 checkbox（虽然已经隐藏，但以防万一），不要重复触发\n                if (e.target.classList.contains('student-checkbox')) return;\n\n                const checkbox = this.querySelector('.student-checkbox');\n                checkbox.checked = !checkbox.checked;\n\n                const studentId = checkbox.value;\n                const cardWrapper = this.closest('.student-card-wrapper');\n\n                if (checkbox.checked) {\n                    selectedStudents.add(studentId);\n                    this.classList.add('selected');\n                } else {\n                    selectedStudents.delete(studentId);\n                    this.classList.remove('selected');\n                }\n\n                updateSelectedInfo();\n            });\n        });\n\n        // 全选按钮\n        document.getElementById('selectAllBtn').addEventListener('click', function () {\n            const visibleCards = document.querySelectorAll('.student-card-wrapper:not([style*=\"display: none\"])');\n            visibleCards.forEach(wrapper => {\n                const checkbox = wrapper.querySelector('.student-checkbox');\n                const card = wrapper.querySelector('.student-card');\n                checkbox.checked = true;\n                const studentId = checkbox.value;\n                selectedStudents.add(studentId);\n                card.classList.add('selected');\n            });\n            updateSelectedInfo();\n        });\n\n        // 全选本组按钮\n        document.querySelectorAll('.group-select-all').forEach(btn => {\n            btn.addEventListener('click', function () {\n                const groupId = this.dataset.groupId;\n                let wrappers;\n\n                if (groupId === 'ungrouped') {\n                    wrappers = document.querySelectorAll('.student-card-wrapper[data-filter-type=\"ungrouped\"]');\n                } else {\n                    wrappers = document.querySelectorAll(`.student-card-wrapper[data-group-id=\"${groupId}\"]`);\n                }\n\n                wrappers.forEach(wrapper => {\n                    const checkbox = wrapper.querySelector('.student-checkbox');\n                    const card = wrapper.querySelector('.student-card');\n                    checkbox.checked = true;\n                    const studentId = checkbox.value;\n                    selectedStudents.add(studentId);\n                    card.classList.add('selected');\n                });\n                updateSelectedInfo();\n            });\n        });\n\n        // 清除所有选择\n        document.getElementById('clearAllBtn').addEventListener('click', function () {\n            document.querySelectorAll('.student-checkbox').forEach(checkbox => {\n                checkbox.checked = false;\n            });\n            document.querySelectorAll('.student-card').forEach(card => {\n                card.classList.remove('selected');\n            });\n            selectedStudents.clear();\n            updateSelectedInfo();\n        });\n\n        // 更新选中信息显示\n        function updateSelectedInfo() {\n            const count = selectedStudents.size;\n            document.getElementById('selectedCount').textContent = count;\n\n            // 同步移动端计数\n            const mobileCount = document.getElementById('mobileSelectedCount');\n            if (mobileCount) mobileCount.textContent = count;\n\n            const modalCount = document.getElementById('modalSelectedCountDisp');\n            if (modalCount) modalCount.textContent = count;\n        }\n\n        // 移动端操作按钮事件\n        const mobileOpsModal = new bootstrap.Modal(document.getElementById('mobileOpsModal'));\n\n        document.getElementById('mobileQuickAddBtn')?.addEventListener('click', function () {\n            applyMobileQuickOperation(true);\n        });\n\n        document.getElementById('mobileQuickMinusBtn')?.addEventListener('click', function () {\n            applyMobileQuickOperation(false);\n        });\n\n        function applyMobileQuickOperation(isAdd) {\n            const points = parseInt(document.getElementById('mobileCustomPoints').value) || 0;\n            const category = document.getElementById('mobileQuickCategory').value || '自定义';\n            const reason = document.getElementById('mobileQuickReason').value || (isAdd ? '自定义加分' : '自定义扣分');\n\n            if (points === 0) {\n                showNotification('请先设定积分值', 'warning');\n                return;\n            }\n\n            if (selectedStudents.size === 0) {\n                showNotification('请先选择学生', 'warning');\n                return;\n            }\n\n            const actualPoints = isAdd ? Math.abs(points) : -Math.abs(points);\n            const studentIds = Array.from(selectedStudents);\n\n            mobileOpsModal.hide();\n\n            // 执行批量提交\n            batchSubmitPoints(studentIds, actualPoints, category, reason, isAdd);\n        }\n\n        // 提取批量提交函数\n        function batchSubmitPoints(studentIds, actualPoints, category, reason, isAdd) {\n            let completed = 0;\n            studentIds.forEach(studentId => {\n                submitPoints(studentId, actualPoints, category, reason, '', function () {\n                    completed++;\n                    if (completed === studentIds.length) {\n                        // 清除选择\n                        document.querySelectorAll('.student-checkbox:checked').forEach(checkbox => {\n                            checkbox.checked = false;\n                        });\n                        document.querySelectorAll('.student-card').forEach(card => card.classList.remove('selected'));\n                        selectedStudents.clear();\n                        updateSelectedInfo();\n                        showNotification(`成功为${studentIds.length}名学生${isAdd ? '加分' : '扣分'} ${Math.abs(actualPoints)}分`, 'success');\n                    }\n                });\n            });\n        }\n\n        // 重构原 PC 端快速操作，复用 batchSubmitPoints\n        document.getElementById('quickAddBtn')?.addEventListener('click', function () {\n            const points = parseInt(document.getElementById('customPointsValue').value) || 0;\n            const category = document.getElementById('quickCategory').value || '自定义';\n            const reason = document.getElementById('quickReason').value || '自定义加分';\n\n            if (points === 0 || selectedStudents.size === 0) {\n                showNotification(points === 0 ? '请设定积分值' : '请先选择学生', 'warning');\n                return;\n            }\n            batchSubmitPoints(Array.from(selectedStudents), Math.abs(points), category, reason, true);\n        });\n\n        document.getElementById('quickMinusBtn')?.addEventListener('click', function () {\n            const points = parseInt(document.getElementById('customPointsValue').value) || 0;\n            const category = document.getElementById('quickCategory').value || '自定义';\n            const reason = document.getElementById('quickReason').value || '自定义扣分';\n\n            if (points === 0 || selectedStudents.size === 0) {\n                showNotification(points === 0 ? '请设定积分值' : '请先选择学生', 'warning');\n                return;\n            }\n            batchSubmitPoints(Array.from(selectedStudents), -Math.abs(points), category, reason, false);\n        });\n\n        // 打开快速积分模态框\n        function openQuickPointsModal(studentId, defaultPoints) {\n            const card = document.querySelector(`[data-student-id=\"${studentId}\"]`);\n            const studentName = card.dataset.studentName;\n            const currentPoints = card.dataset.currentPoints;\n\n            document.getElementById('modalStudentId').value = studentId;\n            document.getElementById('modalStudentName').textContent = studentName;\n            document.getElementById('modalCurrentPoints').textContent = currentPoints;\n            document.getElementById('customPoints').value = defaultPoints !== 0 ? defaultPoints : '';\n\n            quickPointsModal.show();\n        }\n\n        // 快捷积分按钮\n        document.querySelectorAll('.quick-add-points').forEach(btn => {\n            btn.addEventListener('click', function () {\n                const points = parseInt(this.dataset.points);\n                document.getElementById('customPoints').value = points;\n            });\n        });\n\n        // 提交快速积分\n        document.getElementById('submitQuickPoints').addEventListener('click', function () {\n            const studentId = document.getElementById('modalStudentId').value;\n            const points = parseInt(document.getElementById('customPoints').value) || 0;\n            const category = document.getElementById('modalCategory').value || '快捷操作';\n            const reason = document.getElementById('modalReason').value || '无具体事由';\n            const operator = document.getElementById('modalOperator').value;\n\n            if (points === 0) {\n                alert('请输入积分值');\n                return;\n            }\n\n            submitPoints(studentId, points, category, reason, operator);\n            quickPointsModal.hide();\n        });\n\n        // 提交传统表单\n        document.getElementById('submitTraditional').addEventListener('click', function () {\n            const form = document.getElementById('traditionalForm');\n            const formData = new FormData(form);\n\n            const studentId = formData.get('student_id');\n            const points = parseInt(formData.get('points')) || 0;\n            const category = formData.get('category') || '其他';\n            const reason = formData.get('reason') || '无具体事由';\n            const operator = formData.get('operator');\n\n            if (!studentId || points === 0 || !category) {\n                alert('请填写必要信息');\n                return;\n            }\n\n            submitPoints(studentId, points, category, reason, operator);\n            traditionalModal.hide();\n            form.reset();\n        });\n\n        // 提交积分数据\n        function submitPoints(studentId, points, category, reason, operator = '', callback) {\n            const formData = new FormData();\n            formData.append('student_id', studentId);\n            formData.append('points', points);\n            formData.append('category', category);\n            formData.append('reason', reason);\n            if (operator) {\n                formData.append('operator', operator);\n            }\n\n            fetch('";
output += runtime.suppressValue((lineno = 940, colno = 29, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_points"])), env.opts.autoescape);
output += "', {\n                method: 'POST',\n                headers: {\n                    'X-Requested-With': 'XMLHttpRequest'\n                },\n                body: formData\n            })\n                .then(response => response.json())\n                .then(data => {\n                    if (data.success) {\n                        // 更新学生积分显示\n                        updateStudentPoints(studentId, data.new_total_points);\n\n                        // 添加动画效果\n                        addPointsAnimation(studentId, points);\n\n                        // 执行回调\n                        if (callback) callback();\n                    } else {\n                        showNotification(data.message || '录入失败', 'error');\n                        if (callback) callback();\n                    }\n                })\n                .catch(error => {\n                    console.error('Error:', error);\n                    showNotification('网络错误，请重试', 'error');\n                    if (callback) callback();\n                });\n        }\n\n        // 更新学生积分显示\n        function updateStudentPoints(studentId, newPoints) {\n            const card = document.querySelector(`[data-student-id=\"${studentId}\"]`);\n            if (card) {\n                card.dataset.currentPoints = newPoints;\n                const pointsValue = card.querySelector('.points-value');\n                if (pointsValue) {\n                    pointsValue.textContent = newPoints;\n                }\n            }\n        }\n\n        // 添加积分变化动画\n        function addPointsAnimation(studentId, points) {\n            const card = document.querySelector(`[data-student-id=\"${studentId}\"]`);\n            if (card) {\n                const pointsValue = card.querySelector('.points-value');\n                if (pointsValue) {\n                    pointsValue.classList.add(points > 0 ? 'points-animation' : 'points-negative-animation');\n                    setTimeout(() => {\n                        pointsValue.classList.remove('points-animation', 'points-negative-animation');\n                    }, 600);\n                }\n            }\n        }\n\n        // 显示通知\n        function showNotification(message, type = 'success') {\n            const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';\n            const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';\n\n            const notification = document.createElement('div');\n            notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;\n            notification.style.zIndex = '9999';\n            notification.innerHTML = `\n            <i class=\"bi ${icon}\"></i> ${message}\n            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button>\n        `;\n\n            document.body.appendChild(notification);\n\n            setTimeout(() => {\n                notification.remove();\n            }, 3000);\n        }\n\n    });\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};
})();
precompiledTemplates["add_student.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "add_student.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <div class=\"d-flex justify-content-between align-items-center\">\n            <h1 class=\"h2\">添加学生</h1>\n            <a href=\"";
output += runtime.suppressValue((lineno = 7, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["students"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-secondary\">\n                <i class=\"bi bi-arrow-left\"></i> 返回学生列表\n            </a>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-8\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h5 class=\"mb-0\">\n                    <i class=\"bi bi-person-plus-fill\"></i> 学生信息\n                </h5>\n            </div>\n            <form method=\"POST\" enctype=\"multipart/form-data\">\n                <div class=\"card-body\">\n                    <!-- Excel导入区域 -->\n                    <div class=\"mb-4 p-3 border rounded bg-light\">\n                        <h6 class=\"mb-3\">\n                            <i class=\"bi bi-file-earmark-excel text-success\"></i> Excel批量导入\n                        </h6>\n                        <button type=\"submit\" class=\"btn btn-success\" name=\"action\" value=\"import\">\n                            <i class=\"bi bi-upload\"></i> 批量导入\n                        </button>\n                    </div>\n\n                    <hr>\n\n                    <!-- 单个添加区域 -->\n\n                    <div class=\"mb-3\">\n                        <label for=\"name\" class=\"form-label\">姓名 <span class=\"text-danger\">*</span></label>\n                        <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" required placeholder=\"请输入学生姓名\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"class_name\" class=\"form-label\">班级 <span class=\"text-danger\">*</span></label>\n                        <input type=\"text\" class=\"form-control\" id=\"class_name\" name=\"class_name\" required\n                            placeholder=\"请输入班级名称，如：一年级一班\">\n                    </div>\n                </div>\n\n                <div class=\"card-footer\">\n                    <button type=\"submit\" class=\"btn btn-primary\">\n                        <i class=\"bi bi-check-circle\"></i> 添加学生\n                    </button>\n                    <a href=\"";
output += runtime.suppressValue((lineno = 54, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["students"])), env.opts.autoescape);
output += "\" class=\"btn btn-secondary ms-2\">\n                        <i class=\"bi bi-x-circle\"></i> 取消\n                    </a>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div class=\"col-md-4\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-info-circle-fill\"></i> 使用说明\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <ul class=\"list-unstyled\">\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-check-circle text-success\"></i>\n                        支持 Excel 批量导入姓名\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-check-circle text-success\"></i>\n                        姓名请使用真实姓名\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-check-circle text-success\"></i>\n                        班级名称建议使用标准格式\n                    </li>\n                    <li class=\"mb-2\">\n                        <i class=\"bi bi-info-circle text-info\"></i>\n                        添加后可以为学生录入积分记录\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n        <div class=\"card mt-3\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-lightning-fill\"></i> 快速提示\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <div class=\"alert alert-info\">\n                    <small>\n                        <strong>班级名称建议格式：</strong><br>\n                        • 一年级一班<br>\n                        • 三年二班<br>\n                        • 六年级三班\n                    </small>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};
})();
precompiledTemplates["base.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>班级积分管理系统</title>\n\n    <!-- DNS 预解析和预连接优化 -->\n    <link rel=\"dns-prefetch\" href=\"https://cdn.jsdelivr.net\">\n    <link rel=\"preconnect\" href=\"https://cdn.jsdelivr.net\" crossorigin>\n    <link rel=\"dns-prefetch\" href=\"https://api.dicebear.com\">\n    <link rel=\"preconnect\" href=\"https://api.dicebear.com\" crossorigin>\n\n    <!-- 关键 CSS - Bootstrap 核心样式 -->\n    <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\">\n\n    <!-- 非关键 CSS - 图标字体延迟加载 -->\n    <link rel=\"preload\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css\" as=\"style\"\n        onload=\"this.onload=null;this.rel='stylesheet'\">\n    <noscript>\n        <link href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css\" rel=\"stylesheet\">\n    </noscript>\n\n    <style>\n        :root {\n            --sidebar-collapsed-width: 70px;\n            --sidebar-width: 240px;\n            --sidebar-bg: #2c3e50;\n            --transition-speed: 0.3s;\n        }\n\n        body {\n            background-color: #f8f9fa;\n            padding-bottom: 70px;\n        }\n\n        /* Desktop Sidebar */\n        .sidebar {\n            width: var(--sidebar-collapsed-width);\n            height: 100vh;\n            position: fixed;\n            left: 0;\n            top: 0;\n            background: rgba(255, 255, 255, 0.6) !important;\n            backdrop-filter: blur(15px);\n            -webkit-backdrop-filter: blur(15px);\n            border-right: 1px solid rgba(255, 255, 255, 0.3);\n            transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);\n            z-index: 1000;\n            overflow-x: hidden;\n            display: flex;\n            flex-direction: column;\n            color: #333;\n            box-shadow: 4px 0 15px rgba(0, 0, 0, 0.02);\n        }\n\n        .sidebar:hover {\n            width: var(--sidebar-width);\n            background: rgba(255, 255, 255, 0.75) !important;\n            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);\n        }\n\n        .sidebar-header {\n            height: 60px;\n            display: flex;\n            align-items: center;\n            padding: 0 20px;\n            white-space: nowrap;\n            background: rgba(13, 110, 253, 0.05);\n            border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n        }\n\n        .sidebar-brand-text {\n            margin-left: 20px;\n            font-weight: bold;\n            opacity: 0;\n            transition: opacity var(--transition-speed);\n        }\n\n        .sidebar:hover .sidebar-brand-text {\n            opacity: 1;\n        }\n\n        .sidebar-nav {\n            flex-grow: 1;\n            padding: 20px 0;\n        }\n\n        .sidebar-item {\n            display: flex;\n            align-items: center;\n            height: 50px;\n            padding: 0 12px;\n            /* 居中计算: (70-20-26)/2 = 12px */\n            color: #4b5563;\n            text-decoration: none;\n            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n            white-space: nowrap;\n            margin: 4px 10px;\n            border-radius: 12px;\n        }\n\n        .sidebar-item:hover {\n            background: rgba(13, 110, 253, 0.1);\n            color: #0d6efd;\n            transform: translateX(4px);\n        }\n\n        .sidebar-item.active {\n            background: #0d6efd;\n            color: white;\n            box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);\n        }\n\n        .sidebar-item i {\n            font-size: 1.25rem;\n            min-width: 26px;\n            display: flex;\n            justify-content: center;\n        }\n\n        .sidebar-text {\n            margin-left: 20px;\n            opacity: 0;\n            transition: opacity var(--transition-speed);\n        }\n\n        .sidebar:hover .sidebar-text {\n            opacity: 1;\n            margin-left: 10px;\n            /* 展开后图标与文字的间距 */\n        }\n\n        /* Mobile Bottom Nav */\n        .mobile-bottom-nav {\n            position: fixed;\n            bottom: 0;\n            left: 0;\n            right: 0;\n            height: 70px;\n            background: white;\n            display: none;\n            justify-content: space-around;\n            align-items: center;\n            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);\n            z-index: 1000;\n        }\n\n        .nav-link-mobile {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            text-decoration: none;\n            color: #7f8c8d;\n            font-size: 0.75rem;\n        }\n\n        .nav-link-mobile i {\n            font-size: 1.5rem;\n            margin-bottom: 2px;\n        }\n\n        .nav-link-mobile.active {\n            color: var(--primary-color);\n        }\n\n        .main-content {\n            margin-left: 0;\n            padding: 24px 24px 24px calc(var(--sidebar-collapsed-width) + 24px);\n            transition: all var(--transition-speed);\n            min-height: 100vh;\n            background: #f8f9fa;\n        }\n\n        @media (max-width: 768px) {\n            .sidebar {\n                display: none;\n            }\n\n            .mobile-bottom-nav {\n                display: flex;\n            }\n\n            .main-content {\n                margin-left: 0;\n                padding: 15px;\n            }\n\n            body {\n                padding-bottom: 80px;\n            }\n        }\n\n        .card {\n            border: none;\n            border-radius: 15px;\n            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);\n            transition: transform 0.2s;\n        }\n\n        .stats-card:hover {\n            transform: translateY(-5px);\n        }\n\n        .avatar {\n            width: 1.25rem;\n            height: 1.25rem;\n            border-radius: 50%;\n            object-fit: cover;\n            vertical-align: middle;\n        }\n\n        .avatar-circle {\n            display: inline-flex;\n            align-items: center;\n            justify-content: center;\n            border-radius: 50%;\n            font-weight: bold;\n        }\n    </style>\n</head>\n\n<body>\n    <!-- Desktop Sidebar -->\n    <aside class=\"sidebar\">\n        <div class=\"sidebar-header\">\n            <i class=\"bi bi-trophy-fill fs-3 text-primary\"></i>\n            <span class=\"sidebar-brand-text\">积分管理系统</span>\n        </div>\n        <nav class=\"sidebar-nav\">\n            <a href=\"";
output += runtime.suppressValue((lineno = 231, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["index"])), env.opts.autoescape);
output += "\" class=\"sidebar-item\">\n                <i class=\"bi bi-house-door-fill\"></i>\n                <span class=\"sidebar-text\">首页概览</span>\n            </a>\n            <a href=\"";
output += runtime.suppressValue((lineno = 235, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["students"])), env.opts.autoescape);
output += "\" class=\"sidebar-item\">\n                <i class=\"bi bi-people-fill\"></i>\n                <span class=\"sidebar-text\">学生管理</span>\n            </a>\n            <a href=\"";
output += runtime.suppressValue((lineno = 239, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["groups"])), env.opts.autoescape);
output += "\" class=\"sidebar-item\">\n                <i class=\"bi bi-collection-fill\"></i>\n                <span class=\"sidebar-text\">小组管理</span>\n            </a>\n            <a href=\"";
output += runtime.suppressValue((lineno = 243, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_points"])), env.opts.autoescape);
output += "\" class=\"sidebar-item\">\n                <i class=\"bi bi-plus-circle-fill\"></i>\n                <span class=\"sidebar-text\">录入积分</span>\n            </a>\n            <a href=\"";
output += runtime.suppressValue((lineno = 247, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["points_records"])), env.opts.autoescape);
output += "\" class=\"sidebar-item\">\n                <i class=\"bi bi-list-ul\"></i>\n                <span class=\"sidebar-text\">积分记录</span>\n            </a>\n            <a href=\"";
output += runtime.suppressValue((lineno = 251, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["rankings"])), env.opts.autoescape);
output += "\" class=\"sidebar-item\">\n                <i class=\"bi bi-bar-chart-fill\"></i>\n                <span class=\"sidebar-text\">排名统计</span>\n            </a>\n            <a href=\"";
output += runtime.suppressValue((lineno = 255, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["categories"])), env.opts.autoescape);
output += "\" class=\"sidebar-item\">\n                <i class=\"bi bi-tags-fill\"></i>\n                <span class=\"sidebar-text\">类别配置</span>\n            </a>\n        </nav>\n        <div class=\"sidebar-footer mt-auto pb-4\">\n            <a href=\"";
output += runtime.suppressValue((lineno = 261, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["export_data"])), env.opts.autoescape);
output += "\" class=\"sidebar-item\">\n                <i class=\"bi bi-download\"></i>\n                <span class=\"sidebar-text\">数据导出</span>\n            </a>\n        </div>\n    </aside>\n\n    <!-- Mobile Bottom Navigation -->\n    <nav class=\"mobile-bottom-nav\">\n        <a href=\"";
output += runtime.suppressValue((lineno = 270, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["index"])), env.opts.autoescape);
output += "\" class=\"nav-link-mobile\">\n            <i class=\"bi bi-grid-fill\"></i>\n            <span>管理</span>\n        </a>\n        <a href=\"";
output += runtime.suppressValue((lineno = 274, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_points"])), env.opts.autoescape);
output += "\" class=\"nav-link-mobile\">\n            <i class=\"bi bi-plus-circle-fill\" style=\"font-size: 2rem; color: var(--primary-color);\"></i>\n            <span>加分</span>\n        </a>\n        <a href=\"";
output += runtime.suppressValue((lineno = 278, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["rankings"])), env.opts.autoescape);
output += "\" class=\"nav-link-mobile\">\n            <i class=\"bi bi-graph-up-arrow\"></i>\n            <span>统计</span>\n        </a>\n    </nav>\n\n    <main class=\"main-content\">\n        <div class=\"container-fluid\">\n            ";
var t_1;
t_1 = (lineno = 286, colno = 50, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "get_flashed_messages"), "get_flashed_messages", context, [runtime.makeKeywordArgs({"with_categories": true})]));
frame.set("messages", t_1, true);
if(frame.topLevel) {
context.setVariable("messages", t_1);
}
if(frame.topLevel) {
context.addExport("messages", t_1);
}
output += "\n            ";
if(runtime.contextOrFrameLookup(context, frame, "messages")) {
output += "\n            ";
frame = frame.push();
var t_4 = runtime.contextOrFrameLookup(context, frame, "messages");
if(t_4) {t_4 = runtime.fromIterator(t_4);
var t_2;
if(runtime.isArray(t_4)) {
var t_3 = t_4.length;
for(t_2=0; t_2 < t_4.length; t_2++) {
var t_5 = t_4[t_2][0];
frame.set("[object Object]", t_4[t_2][0]);
var t_6 = t_4[t_2][1];
frame.set("[object Object]", t_4[t_2][1]);
frame.set("loop.index", t_2 + 1);
frame.set("loop.index0", t_2);
frame.set("loop.revindex", t_3 - t_2);
frame.set("loop.revindex0", t_3 - t_2 - 1);
frame.set("loop.first", t_2 === 0);
frame.set("loop.last", t_2 === t_3 - 1);
frame.set("loop.length", t_3);
output += "\n            <div class=\"alert alert-";
output += runtime.suppressValue((t_5 == "error"?"danger":"success"), env.opts.autoescape);
output += " alert-dismissible fade show\"\n                role=\"alert\">\n                ";
output += runtime.suppressValue(t_6, env.opts.autoescape);
output += "\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button>\n            </div>\n            ";
;
}
} else {
t_2 = -1;
var t_3 = runtime.keys(t_4).length;
for(var t_7 in t_4) {
t_2++;
var t_8 = t_4[t_7];
frame.set("category", t_7);
frame.set("message", t_8);
frame.set("loop.index", t_2 + 1);
frame.set("loop.index0", t_2);
frame.set("loop.revindex", t_3 - t_2);
frame.set("loop.revindex0", t_3 - t_2 - 1);
frame.set("loop.first", t_2 === 0);
frame.set("loop.last", t_2 === t_3 - 1);
frame.set("loop.length", t_3);
output += "\n            <div class=\"alert alert-";
output += runtime.suppressValue((t_7 == "error"?"danger":"success"), env.opts.autoescape);
output += " alert-dismissible fade show\"\n                role=\"alert\">\n                ";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button>\n            </div>\n            ";
;
}
}
}
frame = frame.pop();
output += "\n            ";
;
}
output += "\n\n            ";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_10,t_9) {
if(t_10) { cb(t_10); return; }
output += t_9;
output += "\n        </div>\n    </main>\n\n    <footer class=\"d-md-none text-center py-3 text-muted\" style=\"margin-bottom: 70px;\">\n        <small>&copy; 2024 班级积分管理系统</small>\n    </footer>\n\n    <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js\"></script>\n    <script>\n        // 为移动端当前页面高亮\n        document.addEventListener('DOMContentLoaded', () => {\n            const currentPath = window.location.pathname;\n            const mobileLinks = document.querySelectorAll('.nav-link-mobile');\n            mobileLinks.forEach(link => {\n                if (link.getAttribute('href') === currentPath) {\n                    link.classList.add('active');\n                }\n            });\n        });\n    </script>\n    ";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_12,t_11) {
if(t_12) { cb(t_12); return; }
output += t_11;
output += "\n</body>\n\n</html>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 297;
var colno = 15;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 318;
var colno = 7;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};
})();
precompiledTemplates["categories.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "categories.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <div class=\"d-flex justify-content-between align-items-center\">\n            <h1 class=\"h2\">类别管理</h1>\n            <a href=\"";
output += runtime.suppressValue((lineno = 7, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_category"])), env.opts.autoescape);
output += "\" class=\"btn btn-primary\">\n                <i class=\"bi bi-plus-circle\"></i> 添加类别\n            </a>\n        </div>\n    </div>\n</div>\n\n<div class=\"card\">\n    <div class=\"card-header\">\n        <h5 class=\"mb-0\">\n            <i class=\"bi bi-tags-fill\"></i> 积分类别列表\n        </h5>\n    </div>\n    <div class=\"card-body\">\n        ";
if(runtime.contextOrFrameLookup(context, frame, "categories")) {
output += "\n            <div class=\"table-responsive\">\n                <table class=\"table table-hover\">\n                    <thead class=\"table-light\">\n                        <tr>\n                            <th>类别名称</th>\n                            <th>描述</th>\n                            <th>默认积分</th>\n                            <th>状态</th>\n                            <th>创建时间</th>\n                            <th>操作</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        ";
frame = frame.push();
var t_8 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("category", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                        <tr>\n                            <td>\n                                <span class=\"badge bg-secondary fs-6\">";
output += runtime.suppressValue(runtime.memberLookup((t_9),"name"), env.opts.autoescape);
output += "</span>\n                            </td>\n                            <td>";
output += runtime.suppressValue(runtime.memberLookup((t_9),"description") || "-", env.opts.autoescape);
output += "</td>\n                            <td>\n                                ";
if(runtime.memberLookup((t_9),"default_points") >= 0) {
output += "\n                                    <span class=\"points-positive\">+";
output += runtime.suppressValue(runtime.memberLookup((t_9),"default_points"), env.opts.autoescape);
output += "</span>\n                                ";
;
}
else {
output += "\n                                    <span class=\"points-negative\">";
output += runtime.suppressValue(runtime.memberLookup((t_9),"default_points"), env.opts.autoescape);
output += "</span>\n                                ";
;
}
output += "\n                            </td>\n                            <td>\n                                ";
if(runtime.memberLookup((t_9),"is_active")) {
output += "\n                                    <span class=\"badge bg-success\">启用</span>\n                                ";
;
}
else {
output += "\n                                    <span class=\"badge bg-secondary\">禁用</span>\n                                ";
;
}
output += "\n                            </td>\n                            <td>";
output += runtime.suppressValue((runtime.memberLookup((t_9),"created_at")?(lineno = 55, colno = 63, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_9),"created_at")),"strftime"), "category[\"created_at\"][\"strftime\"]", context, ["%Y-%m-%d"])):"-"), env.opts.autoescape);
output += "</td>\n                            <td>\n                                <div class=\"btn-group btn-group-sm\">\n                                    <a href=\"";
output += runtime.suppressValue((lineno = 58, colno = 55, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["edit_category",runtime.makeKeywordArgs({"id": runtime.memberLookup((t_9),"id")})])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-primary\" title=\"编辑\">\n                                        <i class=\"bi bi-pencil\"></i>\n                                    </a>\n                                    <form method=\"POST\" action=\"";
output += runtime.suppressValue((lineno = 61, colno = 74, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["delete_category",runtime.makeKeywordArgs({"id": runtime.memberLookup((t_9),"id")})])), env.opts.autoescape);
output += "\" class=\"d-inline\" onsubmit=\"return confirm('确定要删除这个类别吗？此操作不可撤销！')\">\n                                        <button type=\"submit\" class=\"btn btn-outline-danger\" title=\"删除\">\n                                            <i class=\"bi bi-trash\"></i>\n                                        </button>\n                                    </form>\n                                </div>\n                            </td>\n                        </tr>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </tbody>\n                </table>\n            </div>\n        ";
;
}
else {
output += "\n            <div class=\"text-center text-muted py-5\">\n                <i class=\"bi bi-tags fs-1\"></i>\n                <h5 class=\"mt-3 text-muted\">暂无类别</h5>\n                <p class=\"text-muted\">创建第一个积分类别来开始使用系统</p>\n                <a href=\"";
output += runtime.suppressValue((lineno = 78, colno = 35, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_category"])), env.opts.autoescape);
output += "\" class=\"btn btn-primary\">\n                    <i class=\"bi bi-plus-circle\"></i> 添加类别\n                </a>\n            </div>\n        ";
;
}
output += "\n    </div>\n</div>\n\n<!-- 类别说明 -->\n<div class=\"row mt-4\">\n    <div class=\"col-md-6\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-info-circle-fill\"></i> 类别说明\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <p class=\"mb-2\">积分类别用于对不同类型的积分行为进行分类管理：</p>\n                <ul class=\"list-unstyled\">\n                    <li class=\"mb-1\"><i class=\"bi bi-check-circle text-success\"></i> <strong>作业：</strong>作业完成情况</li>\n                    <li class=\"mb-1\"><i class=\"bi bi-check-circle text-success\"></i> <strong>考试：</strong>考试成绩和测验</li>\n                    <li class=\"mb-1\"><i class=\"bi bi-check-circle text-success\"></i> <strong>纪律：</strong>课堂纪律和行为规范</li>\n                    <li class=\"mb-1\"><i class=\"bi bi-check-circle text-success\"></i> <strong>表现：</strong>课堂参与和积极性</li>\n                    <li class=\"mb-1\"><i class=\"bi bi-check-circle text-success\"></i> <strong>其他：</strong>其他特殊情况</li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-md-6\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-lightning-fill\"></i> 使用建议\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <div class=\"alert alert-info\">\n                    <h6>积分设置建议：</h6>\n                    <ul class=\"mb-0\">\n                        <li>作业：+5 / -3 分</li>\n                        <li>考试：+10 / -5 分</li>\n                        <li>纪律：+3 / -5 分</li>\n                        <li>表现：+2 / -2 分</li>\n                        <li>其他：+1 / -1 分</li>\n                    </ul>\n                </div>\n                <small class=\"text-muted\">\n                    默认积分值会在添加记录时自动填入，可以根据实际情况调整。\n                </small>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};
})();
precompiledTemplates["edit_category.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "edit_category.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <h1 class=\"h2\">\n            <i class=\"bi bi-pencil-fill text-primary\"></i> 编辑类别\n        </h1>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-6\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h5 class=\"mb-0\">\n                    <i class=\"bi bi-tags-fill\"></i> 类别信息\n                </h5>\n            </div>\n            <form method=\"POST\">\n                <div class=\"card-body\">\n                    <div class=\"mb-3\">\n                        <label for=\"name\" class=\"form-label\">类别名称 <span class=\"text-danger\">*</span></label>\n                        <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" required\n                               value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "category")),"name"), env.opts.autoescape);
output += "\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"description\" class=\"form-label\">类别描述</label>\n                        <textarea class=\"form-control\" id=\"description\" name=\"description\" rows=\"3\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "category")),"description") || "", env.opts.autoescape);
output += "</textarea>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"default_points\" class=\"form-label\">默认积分值 <span class=\"text-danger\">*</span></label>\n                        <input type=\"number\" class=\"form-control\" id=\"default_points\" name=\"default_points\" required\n                               value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "category")),"default_points"), env.opts.autoescape);
output += "\" min=\"-100\" max=\"100\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"is_active\" name=\"is_active\"\n                                   ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "category")),"is_active")) {
output += "checked";
;
}
output += ">\n                            <label class=\"form-check-label\" for=\"is_active\">\n                                启用该类别\n                            </label>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"card-footer\">\n                    <button type=\"submit\" class=\"btn btn-primary\">\n                        <i class=\"bi bi-check-circle\"></i> 保存修改\n                    </button>\n                    <a href=\"";
output += runtime.suppressValue((lineno = 53, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["categories"])), env.opts.autoescape);
output += "\" class=\"btn btn-secondary ms-2\">\n                        <i class=\"bi bi-x-circle\"></i> 取消\n                    </a>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div class=\"col-md-6\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-info-circle\"></i> 类别统计\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <div class=\"mb-3\">\n                    <div class=\"d-flex justify-content-between\">\n                        <span>创建时间</span>\n                        <strong>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "category")),"id"), env.opts.autoescape);
output += "</strong>\n                    </div>\n                </div>\n                <div class=\"mb-3\">\n                    <div class=\"d-flex justify-content-between\">\n                        <span>默认积分</span>\n                        <strong class=\"text-primary\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "category")),"default_points"), env.opts.autoescape);
output += "分</strong>\n                    </div>\n                </div>\n                <div class=\"mb-3\">\n                    <div class=\"d-flex justify-content-between\">\n                        <span>状态</span>\n                        <strong class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "category")),"is_active")) {
output += "text-success";
;
}
else {
output += "text-danger";
;
}
output += "\">\n                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "category")),"is_active")) {
output += "启用";
;
}
else {
output += "禁用";
;
}
output += "\n                        </strong>\n                    </div>\n                </div>\n\n                <!-- 删除类别 -->\n                <div class=\"mt-4 pt-3 border-top\">\n                    <h6 class=\"text-danger mb-3\">危险操作</h6>\n                    <form method=\"POST\" action=\"";
output += runtime.suppressValue((lineno = 93, colno = 58, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["delete_category",runtime.makeKeywordArgs({"id": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "category")),"id")})])), env.opts.autoescape);
output += "\"\n                          onsubmit=\"return confirm('确定要删除这个类别吗？此操作不可撤销！')\">\n                        <button type=\"submit\" class=\"btn btn-outline-danger w-100\">\n                            <i class=\"bi bi-trash\"></i> 删除类别\n                        </button>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};
})();
precompiledTemplates["edit_group.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "edit_group.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <h1 class=\"h2\">\n            <i class=\"bi bi-pencil-fill text-primary\"></i> 编辑小组\n        </h1>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-8\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h5 class=\"mb-0\">\n                    <i class=\"bi bi-collection-fill\"></i> 小组信息\n                </h5>\n            </div>\n            <form method=\"POST\">\n                <div class=\"card-body\">\n                    <div class=\"mb-3\">\n                        <label for=\"name\" class=\"form-label\">小组名称 <span class=\"text-danger\">*</span></label>\n                        <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" required\n                               value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"name"), env.opts.autoescape);
output += "\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"class_name\" class=\"form-label\">所属班级 <span class=\"text-danger\">*</span></label>\n                        <input type=\"text\" class=\"form-control\" id=\"class_name\" name=\"class_name\" required\n                               value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"class_name"), env.opts.autoescape);
output += "\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"description\" class=\"form-label\">小组描述</label>\n                        <textarea class=\"form-control\" id=\"description\" name=\"description\" rows=\"3\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"description") || "", env.opts.autoescape);
output += "</textarea>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label for=\"color\" class=\"form-label\">小组颜色</label>\n                        <div class=\"d-flex align-items-center\">\n                            <input type=\"color\" class=\"form-control form-control-color me-3\"\n                                   id=\"color\" name=\"color\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"color"), env.opts.autoescape);
output += "\" style=\"width: 60px;\">\n                            <div class=\"flex-grow-1\">\n                                <div class=\"d-flex gap-2 flex-wrap\">\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #007bff;\"\n                                            onclick=\"setColor('#007bff')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #28a745;\"\n                                            onclick=\"setColor('#28a745')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #dc3545;\"\n                                            onclick=\"setColor('#dc3545')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #ffc107;\"\n                                            onclick=\"setColor('#ffc107')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #6f42c1;\"\n                                            onclick=\"setColor('#6f42c1')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #fd7e14;\"\n                                            onclick=\"setColor('#fd7e14')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #20c997;\"\n                                            onclick=\"setColor('#20c997')\">&nbsp;</button>\n                                    <button type=\"button\" class=\"btn btn-sm\" style=\"background-color: #e83e8c;\"\n                                            onclick=\"setColor('#e83e8c')\">&nbsp;</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <!-- 小组成员 -->\n                    <div class=\"mb-3\">\n                        <div class=\"d-flex justify-content-between align-items-center mb-2\">\n                            <h6 class=\"mb-0\">小组成员 (";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"students")), env.opts.autoescape);
output += "人)</h6>\n                            <button type=\"button\" class=\"btn btn-sm btn-outline-primary\" onclick=\"showAddStudentModal()\">\n                                <i class=\"bi bi-person-plus\"></i> 添加成员\n                            </button>\n                        </div>\n                        <div class=\"member-list\" style=\"max-height: 300px; overflow-y: auto;\">\n                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"students")) {
output += "\n                                ";
frame = frame.push();
var t_10 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"students");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("student", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                                <div class=\"d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded\">\n                                    <div>\n                                        <strong>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "</strong>\n                                        <small class=\"text-muted ms-2\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"student_id"), env.opts.autoescape);
output += "</small>\n                                    </div>\n                                    <div class=\"text-end\">\n                                        <div class=\"badge bg-primary\">";
output += runtime.suppressValue((lineno = 83, colno = 93, runtime.callWrap(runtime.memberLookup((t_11),"total_points"), "student[\"total_points\"]", context, [])), env.opts.autoescape);
output += "分</div>\n                                        <div class=\"badge bg-success ms-1\">";
output += runtime.suppressValue((lineno = 84, colno = 97, runtime.callWrap(runtime.memberLookup((t_11),"week_points"), "student[\"week_points\"]", context, [])), env.opts.autoescape);
output += "分</div>\n                                        <form method=\"POST\" action=\"";
output += runtime.suppressValue((lineno = 85, colno = 78, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["set_student_group",runtime.makeKeywordArgs({"id": runtime.memberLookup((t_11),"id")})])), env.opts.autoescape);
output += "\" class=\"d-inline\">\n                                            <input type=\"hidden\" name=\"group_id\" value=\"\">\n                                            <button type=\"submit\" class=\"btn btn-sm btn-outline-danger ms-1\"\n                                                    onclick=\"return confirm('确定要将 ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += " 移出小组吗？')\">\n                                                <i class=\"bi bi-dash-circle\"></i> 移除\n                                            </button>\n                                        </form>\n                                    </div>\n                                </div>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            ";
;
}
else {
output += "\n                            <p class=\"text-muted text-center\">暂无成员</p>\n                            ";
;
}
output += "\n                        </div>\n                    </div>\n\n                    <!-- 统计信息 -->\n                    <div class=\"row\">\n                        <div class=\"col-6\">\n                            <div class=\"text-center p-3 bg-light rounded\">\n                                <div class=\"h3 mb-0 text-primary\">";
output += runtime.suppressValue((lineno = 105, colno = 87, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"total_points"), "group[\"total_points\"]", context, [])), env.opts.autoescape);
output += "</div>\n                                <small class=\"text-muted\">小组总积分</small>\n                            </div>\n                        </div>\n                        <div class=\"col-6\">\n                            <div class=\"text-center p-3 bg-light rounded\">\n                                <div class=\"h3 mb-0 text-success\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",(lineno = 111, colno = 103, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"average_points"), "group[\"average_points\"]", context, []))), env.opts.autoescape);
output += "</div>\n                                <small class=\"text-muted\">平均积分</small>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"card-footer\">\n                    <button type=\"submit\" class=\"btn btn-primary\">\n                        <i class=\"bi bi-check-circle\"></i> 保存修改\n                    </button>\n                    <a href=\"";
output += runtime.suppressValue((lineno = 122, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["groups"])), env.opts.autoescape);
output += "\" class=\"btn btn-secondary ms-2\">\n                        <i class=\"bi bi-x-circle\"></i> 取消\n                    </a>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div class=\"col-md-4\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-graph-up\"></i> 小组统计\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <div class=\"mb-3\">\n                    <div class=\"d-flex justify-content-between\">\n                        <span>成员数量</span>\n                        <strong>";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"students")), env.opts.autoescape);
output += "人</strong>\n                    </div>\n                </div>\n                <div class=\"mb-3\">\n                    <div class=\"d-flex justify-content-between\">\n                        <span>总积分</span>\n                        <strong class=\"text-primary\">";
output += runtime.suppressValue((lineno = 147, colno = 74, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"total_points"), "group[\"total_points\"]", context, [])), env.opts.autoescape);
output += "分</strong>\n                    </div>\n                </div>\n                <div class=\"mb-3\">\n                    <div class=\"d-flex justify-content-between\">\n                        <span>平均积分</span>\n                        <strong class=\"text-success\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",(lineno = 153, colno = 90, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"average_points"), "group[\"average_points\"]", context, []))), env.opts.autoescape);
output += "分</strong>\n                    </div>\n                </div>\n                <div class=\"mb-3\">\n                    <div class=\"d-flex justify-content-between\">\n                        <span>本周积分</span>\n                        <strong class=\"text-info\">";
output += runtime.suppressValue((lineno = 159, colno = 70, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"week_points"), "group[\"week_points\"]", context, [])), env.opts.autoescape);
output += "分</strong>\n                    </div>\n                </div>\n                <div class=\"mb-3\">\n                    <div class=\"d-flex justify-content-between\">\n                        <span>本周平均</span>\n                        <strong class=\"text-warning\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",(lineno = 165, colno = 95, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"week_average_points"), "group[\"week_average_points\"]", context, []))), env.opts.autoescape);
output += "分</strong>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- 添加学生模态框 -->\n    <div class=\"modal fade\" id=\"addStudentModal\" tabindex=\"-1\">\n        <div class=\"modal-dialog modal-lg\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h5 class=\"modal-title\">\n                        <i class=\"bi bi-person-plus\"></i> 添加学生到小组\n                    </h5>\n                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n                </div>\n                <form method=\"POST\" action=\"";
output += runtime.suppressValue((lineno = 182, colno = 54, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_students_to_group",runtime.makeKeywordArgs({"id": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "group")),"id")})])), env.opts.autoescape);
output += "\">\n                    <div class=\"modal-body\">\n                        ";
if(runtime.contextOrFrameLookup(context, frame, "available_students")) {
output += "\n                            <div class=\"d-flex justify-content-between align-items-center mb-3\">\n                                <p class=\"text-muted mb-0\">选择要添加到小组的学生：</p>\n                                <div class=\"form-check\">\n                                    <input class=\"form-check-input\" type=\"checkbox\" id=\"selectAll\">\n                                    <label class=\"form-check-label small\" for=\"selectAll\">全选</label>\n                                </div>\n                            </div>\n                            <div class=\"available-students\" style=\"max-height: 400px; overflow-y: auto;\">\n                                ";
frame = frame.push();
var t_14 = runtime.contextOrFrameLookup(context, frame, "available_students");
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("student", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n                                <div class=\"d-flex justify-content-between align-items-center mb-2 p-2 border rounded\">\n                                    <div class=\"d-flex align-items-center\">\n                                        <input class=\"form-check-input me-3 student-checkbox\" type=\"checkbox\"\n                                               name=\"student_ids\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"id"), env.opts.autoescape);
output += "\" id=\"student_";
output += runtime.suppressValue(runtime.memberLookup((t_15),"id"), env.opts.autoescape);
output += "\">\n                                        <div>\n                                            <strong>";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "</strong>\n                                            <small class=\"text-muted ms-2\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"student_id"), env.opts.autoescape);
output += "</small>\n                                            ";
if(runtime.memberLookup((t_15),"group")) {
output += "\n                                                <span class=\"badge bg-secondary ms-2\">当前: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_15),"group")),"name"), env.opts.autoescape);
output += "</span>\n                                            ";
;
}
output += "\n                                        </div>\n                                    </div>\n                                    <div class=\"text-end\">\n                                        <div class=\"badge bg-primary\">";
output += runtime.suppressValue((lineno = 207, colno = 93, runtime.callWrap(runtime.memberLookup((t_15),"total_points"), "student[\"total_points\"]", context, [])), env.opts.autoescape);
output += "分</div>\n                                        <div class=\"badge bg-success ms-1\">";
output += runtime.suppressValue((lineno = 208, colno = 97, runtime.callWrap(runtime.memberLookup((t_15),"week_points"), "student[\"week_points\"]", context, [])), env.opts.autoescape);
output += "分</div>\n                                    </div>\n                                </div>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            </div>\n                            <div class=\"mt-3 p-2 bg-light rounded\">\n                                <small class=\"text-muted\">\n                                    <i class=\"bi bi-info-circle\"></i>\n                                    已选择 <span id=\"selectedCount\">0</span> 名学生\n                                </small>\n                            </div>\n                        ";
;
}
else {
output += "\n                            <div class=\"text-center text-muted py-4\">\n                                <i class=\"bi bi-inbox fs-1\"></i>\n                                <p class=\"mt-2\">暂无可添加的学生</p>\n                                <p class=\"small\">该班级没有学生或所有学生已在小组中</p>\n                                <a href=\"";
output += runtime.suppressValue((lineno = 224, colno = 51, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["students"])), env.opts.autoescape);
output += "\" class=\"btn btn-primary btn-sm mt-2\">\n                                    <i class=\"bi bi-person-plus\"></i> 添加学生\n                                </a>\n                            </div>\n                        ";
;
}
output += "\n                    </div>\n                    <div class=\"modal-footer\">\n                        ";
if(runtime.contextOrFrameLookup(context, frame, "available_students")) {
output += "\n                            <button type=\"submit\" class=\"btn btn-primary\" id=\"addSelectedBtn\" disabled>\n                                <i class=\"bi bi-plus-circle\"></i> 添加选中学生\n                            </button>\n                        ";
;
}
output += "\n                        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">关闭</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 245;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script>\nfunction setColor(color) {\n    document.getElementById('color').value = color;\n}\n\nfunction showAddStudentModal() {\n    const modal = new bootstrap.Modal(document.getElementById('addStudentModal'));\n    modal.show();\n}\n\n// 多选功能\nfunction updateSelectedCount() {\n    const checkboxes = document.querySelectorAll('.student-checkbox:checked');\n    const selectedCount = checkboxes.length;\n    document.getElementById('selectedCount').textContent = selectedCount;\n\n    const addButton = document.getElementById('addSelectedBtn');\n    addButton.disabled = selectedCount === 0;\n}\n\nfunction toggleSelectAll() {\n    const selectAll = document.getElementById('selectAll');\n    const checkboxes = document.querySelectorAll('.student-checkbox');\n\n    checkboxes.forEach(checkbox => {\n        checkbox.checked = selectAll.checked;\n    });\n\n    updateSelectedCount();\n}\n\n// 确保Bootstrap已加载\ndocument.addEventListener('DOMContentLoaded', function() {\n    if (typeof bootstrap === 'undefined') {\n        console.error('Bootstrap is not loaded');\n    }\n\n    // 初始化多选功能\n    const selectAll = document.getElementById('selectAll');\n    const checkboxes = document.querySelectorAll('.student-checkbox');\n\n    if (selectAll) {\n        selectAll.addEventListener('change', toggleSelectAll);\n    }\n\n    if (checkboxes.length > 0) {\n        checkboxes.forEach(checkbox => {\n            checkbox.addEventListener('change', updateSelectedCount);\n        });\n    }\n\n    // 初始化选中计数\n    updateSelectedCount();\n});\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};
})();
precompiledTemplates["groups.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "groups.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <div class=\"d-flex justify-content-between align-items-center\">\n            <h1 class=\"h2\">\n                <i class=\"bi bi-collection-fill text-primary\"></i> 小组管理\n            </h1>\n            <a href=\"";
output += runtime.suppressValue((lineno = 9, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_group"])), env.opts.autoescape);
output += "\" class=\"btn btn-primary\">\n                <i class=\"bi bi-plus-circle\"></i> 添加小组\n            </a>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    ";
frame = frame.push();
var t_8 = runtime.contextOrFrameLookup(context, frame, "groups");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("group", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n    <div class=\"col-xl-4 col-lg-6 mb-4\">\n        <div class=\"card h-100 border-0 shadow-sm group-card\">\n            <div class=\"card-header d-flex justify-content-between align-items-center\"\n                 style=\"background-color: ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"color"), env.opts.autoescape);
output += "20; border-left: 4px solid ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"color"), env.opts.autoescape);
output += ";\">\n                <div class=\"d-flex align-items-center\">\n                    <div class=\"group-icon me-3\" style=\"color: ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"color"), env.opts.autoescape);
output += ";\">\n                        <i class=\"bi bi-collection-fill fs-4\"></i>\n                    </div>\n                    <div>\n                        <h5 class=\"card-title mb-0\">";
output += runtime.suppressValue(runtime.memberLookup((t_9),"name"), env.opts.autoescape);
output += "</h5>\n                        <small class=\"text-muted\">";
output += runtime.suppressValue(runtime.memberLookup((t_9),"class_name"), env.opts.autoescape);
output += "</small>\n                    </div>\n                </div>\n                <div class=\"btn-group\">\n                    <a href=\"";
output += runtime.suppressValue((lineno = 32, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["edit_group",runtime.makeKeywordArgs({"id": runtime.memberLookup((t_9),"id")})])), env.opts.autoescape);
output += "\" class=\"btn btn-sm btn-outline-primary\">\n                        <i class=\"bi bi-pencil\"></i>\n                    </a>\n                    <form method=\"POST\" action=\"";
output += runtime.suppressValue((lineno = 35, colno = 58, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["delete_group",runtime.makeKeywordArgs({"id": runtime.memberLookup((t_9),"id")})])), env.opts.autoescape);
output += "\"\n                          onsubmit=\"return confirm('确定要删除这个小组吗？');\" class=\"d-inline\">\n                        <button type=\"submit\" class=\"btn btn-sm btn-outline-danger\">\n                            <i class=\"bi bi-trash\"></i>\n                        </button>\n                    </form>\n                </div>\n            </div>\n            <div class=\"card-body\">\n                ";
if(runtime.memberLookup((t_9),"description")) {
output += "\n                <p class=\"card-text text-muted\">";
output += runtime.suppressValue(runtime.memberLookup((t_9),"description"), env.opts.autoescape);
output += "</p>\n                ";
;
}
output += "\n\n                <div class=\"row mb-3\">\n                    <div class=\"col-6\">\n                        <div class=\"text-center p-2 bg-light rounded\">\n                            <div class=\"h4 mb-0 text-primary\">";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((t_9),"students")), env.opts.autoescape);
output += "</div>\n                            <small class=\"text-muted\">成员数量</small>\n                        </div>\n                    </div>\n                    <div class=\"col-6\">\n                        <div class=\"text-center p-2 bg-light rounded\">\n                            <div class=\"h4 mb-0 text-success\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",(lineno = 57, colno = 99, runtime.callWrap(runtime.memberLookup((t_9),"average_points"), "group[\"average_points\"]", context, []))), env.opts.autoescape);
output += "</div>\n                            <small class=\"text-muted\">平均积分</small>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"mb-3\">\n                    <h6 class=\"text-muted mb-2\">小组成员</h6>\n                    <div class=\"member-list\" style=\"max-height: 200px; overflow-y: auto;\">\n                        ";
if(runtime.memberLookup((t_9),"students")) {
output += "\n                            ";
frame = frame.push();
var t_12 = runtime.memberLookup((t_9),"students");
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("student", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n                            <div class=\"d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded\">\n                                <div>\n                                    <strong>";
output += runtime.suppressValue(runtime.memberLookup((t_13),"name"), env.opts.autoescape);
output += "</strong>\n                                    <small class=\"text-muted ms-2\">";
output += runtime.suppressValue(runtime.memberLookup((t_13),"student_id"), env.opts.autoescape);
output += "</small>\n                                </div>\n                                <div class=\"text-end\">\n                                    <div class=\"badge bg-primary\">";
output += runtime.suppressValue((lineno = 74, colno = 89, runtime.callWrap(runtime.memberLookup((t_13),"total_points"), "student[\"total_points\"]", context, [])), env.opts.autoescape);
output += "分</div>\n                                    <div class=\"badge bg-success ms-1\">";
output += runtime.suppressValue((lineno = 75, colno = 93, runtime.callWrap(runtime.memberLookup((t_13),"week_points"), "student[\"week_points\"]", context, [])), env.opts.autoescape);
output += "分</div>\n                                </div>\n                            </div>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        ";
;
}
else {
output += "\n                        <p class=\"text-muted text-center\">暂无成员</p>\n                        ";
;
}
output += "\n                    </div>\n                </div>\n\n                <div class=\"d-flex justify-content-between\">\n                    <small class=\"text-muted\">\n                        <i class=\"bi bi-calendar\"></i> 创建于 ";
output += runtime.suppressValue((lineno = 87, colno = 87, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_9),"created_at")),"strftime"), "group[\"created_at\"][\"strftime\"]", context, ["%Y-%m-%d"])), env.opts.autoescape);
output += "\n                    </small>\n                    <div>\n                        <span class=\"badge bg-light text-dark\">\n                            总分: ";
output += runtime.suppressValue((lineno = 91, colno = 53, runtime.callWrap(runtime.memberLookup((t_9),"total_points"), "group[\"total_points\"]", context, [])), env.opts.autoescape);
output += "\n                        </span>\n                        <span class=\"badge bg-info text-white\">\n                            本周: ";
output += runtime.suppressValue((lineno = 94, colno = 52, runtime.callWrap(runtime.memberLookup((t_9),"week_points"), "group[\"week_points\"]", context, [])), env.opts.autoescape);
output += "\n                        </span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ";
;
}
}
if (!t_7) {
output += "\n    <div class=\"col-12\">\n        <div class=\"text-center py-5\">\n            <i class=\"bi bi-collection text-muted\" style=\"font-size: 4rem;\"></i>\n            <h4 class=\"mt-3 text-muted\">暂无小组</h4>\n            <p class=\"text-muted\">点击上方按钮创建第一个小组</p>\n        </div>\n    </div>\n    ";
}
frame = frame.pop();
output += "\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};
})();
precompiledTemplates["import_points.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "import_points.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container-fluid\">\n    <!-- 页面头部 -->\n    <div class=\"row mb-4\">\n        <div class=\"col-12\">\n            <div class=\"d-flex justify-content-between align-items-center\">\n                <div>\n                    <h1 class=\"h2 mb-1\">\n                        <i class=\"bi bi-file-earmark-spreadsheet text-primary\"></i> 批量导入分数\n                    </h1>\n                    <p class=\"text-muted mb-0\">通过Excel表格批量导入学生分数</p>\n                </div>\n                <div>\n                    <a href=\"";
output += runtime.suppressValue((lineno = 15, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_points"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-secondary\">\n                        <i class=\"bi bi-arrow-left\"></i> 返回积分录入\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- 导入说明 -->\n    <div class=\"row mb-4\">\n        <div class=\"col-12\">\n            <div class=\"card border-0 bg-light\">\n                <div class=\"card-body\">\n                    <h5 class=\"card-title\">\n                        <i class=\"bi bi-info-circle text-primary\"></i> 导入说明\n                    </h5>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <h6>文件格式要求：</h6>\n                            <ul class=\"mb-0\">\n                                <li>支持 .xlsx 和 .xls 格式的Excel文件</li>\n                                <li>第一列必须是<strong>学生姓名</strong></li>\n                                <li>第二列必须是<strong>分数</strong>（整数）</li>\n                                <li>从第二行开始为数据行（第一行可以是标题）</li>\n                            </ul>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <h6>示例格式：</h6>\n                            <div class=\"table-responsive\">\n                                <table class=\"table table-bordered table-sm\">\n                                    <thead class=\"table-light\">\n                                        <tr>\n                                            <th>姓名</th>\n                                            <th>分数</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr>\n                                            <td>张三</td>\n                                            <td>10</td>\n                                        </tr>\n                                        <tr>\n                                            <td>李四</td>\n                                            <td>-5</td>\n                                        </tr>\n                                        <tr>\n                                            <td>王五</td>\n                                            <td>8</td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- 导入表单 -->\n    <div class=\"row\">\n        <div class=\"col-md-8\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <h5 class=\"card-title mb-0\">\n                        <i class=\"bi bi-upload text-primary\"></i> 上传文件\n                    </h5>\n                </div>\n                <div class=\"card-body\">\n                    <form method=\"POST\" enctype=\"multipart/form-data\" id=\"importForm\">\n                        <div class=\"mb-4\">\n                            <label for=\"file\" class=\"form-label\">\n                                <strong>选择Excel文件</strong>\n                            </label>\n                            <input type=\"file\" class=\"form-control form-control-lg\" id=\"file\" name=\"file\"\n                                   accept=\".xlsx,.xls\" required>\n                            <div class=\"form-text\">\n                                请选择符合格式要求的Excel文件\n                            </div>\n                        </div>\n\n                        <div class=\"row mb-4\">\n                            <div class=\"col-md-6\">\n                                <label for=\"category\" class=\"form-label\">积分类别</label>\n                                <select class=\"form-select\" id=\"category\" name=\"category\" required>\n                                    <option value=\"\">请选择类别</option>\n                                    ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("category", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                                    <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "</option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                    <option value=\"批量导入\">批量导入</option>\n                                </select>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <label for=\"reason\" class=\"form-label\">积分事由</label>\n                                <input type=\"text\" class=\"form-control\" id=\"reason\" name=\"reason\"\n                                       placeholder=\"请输入积分事由\" value=\"批量导入\" required>\n                            </div>\n                        </div>\n\n                        <div class=\"row mb-4\">\n                            <div class=\"col-md-6\">\n                                <label for=\"operator\" class=\"form-label\">操作人</label>\n                                <input type=\"text\" class=\"form-control\" id=\"operator\" name=\"operator\"\n                                       placeholder=\"请输入操作人姓名\">\n                            </div>\n                            <div class=\"col-md-6\">\n                                <label for=\"skip_not_found\" class=\"form-label\">处理方式</label>\n                                <div class=\"form-check mt-2\">\n                                    <input class=\"form-check-input\" type=\"checkbox\" id=\"skip_not_found\" name=\"skip_not_found\" checked>\n                                    <label class=\"form-check-label\" for=\"skip_not_found\">\n                                        跳过系统中不存在的学生\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"d-grid gap-2\">\n                            <button type=\"submit\" class=\"btn btn-primary btn-lg\" id=\"submitBtn\">\n                                <i class=\"bi bi-upload\"></i> 开始导入\n                            </button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"col-md-4\">\n            <!-- 导入统计 -->\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <h5 class=\"card-title mb-0\">\n                        <i class=\"bi bi-graph-up text-success\"></i> 导入统计\n                    </h5>\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"text-center\">\n                        <div class=\"mb-3\">\n                            <i class=\"bi bi-file-earmark-spreadsheet display-4 text-primary\"></i>\n                        </div>\n                        <h4 id=\"importStatus\">等待导入</h4>\n                        <div class=\"progress mb-3\" style=\"height: 8px;\">\n                            <div id=\"importProgress\" class=\"progress-bar\" role=\"progressbar\" style=\"width: 0%\"></div>\n                        </div>\n                        <div class=\"row text-center\">\n                            <div class=\"col-4\">\n                                <div class=\"border-end\">\n                                    <h5 id=\"totalCount\" class=\"mb-0\">0</h5>\n                                    <small class=\"text-muted\">总记录</small>\n                                </div>\n                            </div>\n                            <div class=\"col-4\">\n                                <div class=\"border-end\">\n                                    <h5 id=\"successCount\" class=\"mb-0 text-success\">0</h5>\n                                    <small class=\"text-muted\">成功</small>\n                                </div>\n                            </div>\n                            <div class=\"col-4\">\n                                <div>\n                                    <h5 id=\"failedCount\" class=\"mb-0 text-danger\">0</h5>\n                                    <small class=\"text-muted\">失败</small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- 注意事项 -->\n            <div class=\"card mt-4\">\n                <div class=\"card-header\">\n                    <h5 class=\"card-title mb-0\">\n                        <i class=\"bi bi-exclamation-triangle text-warning\"></i> 注意事项\n                    </h5>\n                </div>\n                <div class=\"card-body\">\n                    <ul class=\"list-unstyled mb-0\">\n                        <li class=\"mb-2\">\n                            <i class=\"bi bi-check-circle text-success\"></i>\n                            <small>确保学生姓名与系统中一致</small>\n                        </li>\n                        <li class=\"mb-2\">\n                            <i class=\"bi bi-check-circle text-success\"></i>\n                            <small>分数可以是正数（加分）或负数（扣分）</small>\n                        </li>\n                        <li class=\"mb-2\">\n                            <i class=\"bi bi-check-circle text-success\"></i>\n                            <small>建议先导出学生名单核对姓名</small>\n                        </li>\n                        <li>\n                            <i class=\"bi bi-check-circle text-success\"></i>\n                            <small>导入前建议备份数据</small>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- 导入结果 -->\n    <div class=\"row mt-4\" id=\"importResults\" style=\"display: none;\">\n        <div class=\"col-12\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <h5 class=\"card-title mb-0\">\n                        <i class=\"bi bi-list-check text-primary\"></i> 导入结果\n                    </h5>\n                </div>\n                <div class=\"card-body\">\n                    <div id=\"resultsTable\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 231;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script>\ndocument.addEventListener('DOMContentLoaded', function() {\n    const importForm = document.getElementById('importForm');\n    const submitBtn = document.getElementById('submitBtn');\n    const importStatus = document.getElementById('importStatus');\n    const importProgress = document.getElementById('importProgress');\n    const totalCount = document.getElementById('totalCount');\n    const successCount = document.getElementById('successCount');\n    const failedCount = document.getElementById('failedCount');\n    const importResults = document.getElementById('importResults');\n    const resultsTable = document.getElementById('resultsTable');\n\n    importForm.addEventListener('submit', function(e) {\n        e.preventDefault();\n\n        const formData = new FormData(this);\n\n        // 禁用提交按钮\n        submitBtn.disabled = true;\n        submitBtn.innerHTML = '<i class=\"bi bi-hourglass-split\"></i> 导入中...';\n\n        // 重置统计信息\n        importStatus.textContent = '正在导入...';\n        importStatus.className = 'text-warning';\n        importProgress.style.width = '0%';\n        totalCount.textContent = '0';\n        successCount.textContent = '0';\n        failedCount.textContent = '0';\n        importResults.style.display = 'none';\n\n        fetch('";
output += runtime.suppressValue((lineno = 262, colno = 25, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["import_points"])), env.opts.autoescape);
output += "', {\n            method: 'POST',\n            body: formData\n        })\n        .then(response => response.json())\n        .then(data => {\n            if (data.success) {\n                // 更新统计信息\n                totalCount.textContent = data.total_records || 0;\n                successCount.textContent = data.success_count || 0;\n                failedCount.textContent = data.failed_count || 0;\n\n                // 更新进度条\n                const total = data.total_records || 1;\n                const success = data.success_count || 0;\n                const progress = Math.round((success / total) * 100);\n                importProgress.style.width = progress + '%';\n\n                // 显示结果\n                if (data.failed_records && data.failed_records.length > 0) {\n                    importStatus.textContent = '导入完成（有部分失败）';\n                    importStatus.className = 'text-warning';\n\n                    // 显示失败记录\n                    let tableHtml = `\n                        <h6 class=\"text-danger\">失败记录（${data.failed_records.length}条）：</h6>\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-sm table-bordered\">\n                                <thead class=\"table-light\">\n                                    <tr>\n                                        <th>姓名</th>\n                                        <th>分数</th>\n                                        <th>失败原因</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                    `;\n\n                    data.failed_records.forEach(record => {\n                        tableHtml += `\n                            <tr>\n                                <td>${record.name}</td>\n                                <td>${record.points}</td>\n                                <td class=\"text-danger\">${record.error}</td>\n                            </tr>\n                        `;\n                    });\n\n                    tableHtml += `\n                                </tbody>\n                            </table>\n                        </div>\n                    `;\n\n                    resultsTable.innerHTML = tableHtml;\n                    importResults.style.display = 'block';\n                } else {\n                    importStatus.textContent = '导入成功';\n                    importStatus.className = 'text-success';\n                    importProgress.style.width = '100%';\n                }\n\n                showNotification(`导入完成！成功 ${data.success_count} 条，失败 ${data.failed_count} 条`, 'success');\n            } else {\n                importStatus.textContent = '导入失败';\n                importStatus.className = 'text-danger';\n                showNotification(data.message || '导入失败，请检查文件格式', 'error');\n            }\n        })\n        .catch(error => {\n            console.error('Error:', error);\n            importStatus.textContent = '导入失败';\n            importStatus.className = 'text-danger';\n            showNotification('网络错误，请重试', 'error');\n        })\n        .finally(() => {\n            // 恢复提交按钮\n            submitBtn.disabled = false;\n            submitBtn.innerHTML = '<i class=\"bi bi-upload\"></i> 开始导入';\n        });\n    });\n\n    // 显示通知\n    function showNotification(message, type = 'success') {\n        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';\n        const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';\n\n        const notification = document.createElement('div');\n        notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;\n        notification.style.zIndex = '9999';\n        notification.innerHTML = `\n            <i class=\"bi ${icon}\"></i> ${message}\n            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button>\n        `;\n\n        document.body.appendChild(notification);\n\n        setTimeout(() => {\n            notification.remove();\n        }, 5000);\n    }\n});\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};
})();
precompiledTemplates["index.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "index.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<style>\n    .glass-bg {\n        background: rgba(255, 255, 255, 0.7);\n        backdrop-filter: blur(10px);\n        -webkit-backdrop-filter: blur(10px);\n        border: 1px solid rgba(255, 255, 255, 0.3);\n    }\n\n    .hero-banner {\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        border-radius: 20px;\n        padding: 40px;\n        color: white;\n        margin-bottom: 30px;\n        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.2);\n    }\n\n    .stat-card {\n        border-radius: 20px;\n        padding: 25px;\n        height: 100%;\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .stat-card:hover {\n        transform: translateY(-5px);\n    }\n\n    .icon-box {\n        width: 50px;\n        height: 50px;\n        border-radius: 12px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 1.5rem;\n        margin-bottom: 15px;\n    }\n\n    .bg-soft-primary {\n        background: #e0e7ff;\n        color: #4338ca;\n    }\n\n    .bg-soft-success {\n        background: #dcfce7;\n        color: #15803d;\n    }\n\n    .bg-soft-info {\n        background: #e0f2fe;\n        color: #0369a1;\n    }\n\n    .quick-link {\n        display: flex;\n        align-items: center;\n        padding: 15px 20px;\n        border-radius: 15px;\n        text-decoration: none;\n        color: #4b5563;\n        transition: all 0.2s;\n        border: 1px solid #f3f4f6;\n    }\n\n    .quick-link:hover {\n        background: #f9fafb;\n        border-color: #e5e7eb;\n        color: #1f2937;\n    }\n\n    .quick-link i {\n        font-size: 1.25rem;\n        margin-right: 15px;\n    }\n\n    .ranking-item {\n        display: flex;\n        align-items: center;\n        padding: 12px 0;\n        border-bottom: 1px solid #f3f4f6;\n    }\n\n    .ranking-item:last-child {\n        border-bottom: none;\n    }\n\n    .rank-badge {\n        width: 30px;\n        height: 30px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-weight: bold;\n        margin-right: 15px;\n        font-size: 0.875rem;\n    }\n\n    .rank-1 {\n        background: #fef3c7;\n        color: #92400e;\n    }\n\n    .rank-2 {\n        background: #f3f4f6;\n        color: #374151;\n    }\n\n    .rank-3 {\n        background: #ffedd5;\n        color: #9a3412;\n    }\n</style>\n\n<div class=\"row align-items-center mb-4\">\n    <div class=\"col\">\n        <h1 class=\"h3 fw-bold mb-1\">班级全局概览</h1>\n        <p class=\"text-muted mb-0\">实时掌握班级动态与学生表现</p>\n    </div>\n    <div class=\"col-auto\">\n        <span class=\"badge bg-white text-primary border shadow-sm px-3 py-2 rounded-pill\">\n            <i class=\"bi bi-clock me-1\"></i> 最后更新: 刚刚\n        </span>\n    </div>\n</div>\n\n<div class=\"hero-banner\">\n    <div class=\"row align-items-center\">\n        <div class=\"col-md-8\">\n            <h2 class=\"fw-bold mb-3\">你好，优秀班主任 👋</h2>\n            <p class=\"lead mb-4 opacity-75\">今天有 ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "today_records"), env.opts.autoescape);
output += " 条记录，继续加油管理你的班级！</p>\n            <div class=\"d-flex gap-3\">\n                <a href=\"";
output += runtime.suppressValue((lineno = 136, colno = 35, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_points"])), env.opts.autoescape);
output += "\" class=\"btn btn-light rounded-pill px-4\">\n                    <i class=\"bi bi-plus-circle me-1\"></i> 录入积分\n                </a>\n                <a href=\"";
output += runtime.suppressValue((lineno = 139, colno = 35, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["rankings"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-light rounded-pill px-4\">\n                    <i class=\"bi bi-bar-chart me-1\"></i> 排名统计\n                </a>\n            </div>\n        </div>\n        <div class=\"col-md-4 d-none d-md-block text-end\">\n            <i class=\"bi bi-rocket-takeoff\" style=\"font-size: 8rem; opacity: 0.2;\"></i>\n        </div>\n    </div>\n</div>\n\n<div class=\"row g-4 mb-5\">\n    <div class=\"col-md-4\">\n        <div class=\"card stat-card border-0 shadow-sm\">\n            <div class=\"card-body\">\n                <div class=\"icon-box bg-soft-primary\">\n                    <i class=\"bi bi-people-fill\"></i>\n                </div>\n                <h6 class=\"text-muted fw-bold mb-1\">学生总数</h6>\n                <div class=\"h3 fw-bold mb-0\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "total_students"), env.opts.autoescape);
output += " <small class=\"fs-6 text-muted fw-normal\">人</small>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-4\">\n        <div class=\"card stat-card border-0 shadow-sm\">\n            <div class=\"card-body\">\n                <div class=\"icon-box bg-soft-success\">\n                    <i class=\"bi bi-journal-text\"></i>\n                </div>\n                <h6 class=\"text-muted fw-bold mb-1\">累计积分记录</h6>\n                <div class=\"h3 fw-bold mb-0\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "total_records"), env.opts.autoescape);
output += " <small class=\"fs-6 text-muted fw-normal\">次</small>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-4\">\n        <div class=\"card stat-card border-0 shadow-sm\">\n            <div class=\"card-body\">\n                <div class=\"icon-box bg-soft-info\">\n                    <i class=\"bi bi-lightning-fill\"></i>\n                </div>\n                <h6 class=\"text-muted fw-bold mb-1\">今日积分动态</h6>\n                <div class=\"h3 fw-bold mb-0\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "today_records"), env.opts.autoescape);
output += " <small class=\"fs-6 text-muted fw-normal\">项</small>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"row g-4\">\n    <div class=\"col-lg-7\">\n        <div class=\"card border-0 shadow-sm h-100\">\n            <div class=\"card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center\">\n                <h5 class=\"fw-bold mb-0\">功能导航</h5>\n                <i class=\"bi bi-three-dots-vertical text-muted\"></i>\n            </div>\n            <div class=\"card-body p-4\">\n                <div class=\"row g-3\">\n                    <div class=\"col-6\">\n                        <a href=\"";
output += runtime.suppressValue((lineno = 199, colno = 43, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["students"])), env.opts.autoescape);
output += "\" class=\"quick-link\">\n                            <i class=\"bi bi-person-badge text-primary\"></i>\n                            <span>学生信息</span>\n                        </a>\n                    </div>\n                    <div class=\"col-6\">\n                        <a href=\"";
output += runtime.suppressValue((lineno = 205, colno = 43, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["groups"])), env.opts.autoescape);
output += "\" class=\"quick-link\">\n                            <i class=\"bi bi-grid-3x3-gap text-success\"></i>\n                            <span>小组架构</span>\n                        </a>\n                    </div>\n                    <div class=\"col-6\">\n                        <a href=\"";
output += runtime.suppressValue((lineno = 211, colno = 43, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["points_records"])), env.opts.autoescape);
output += "\" class=\"quick-link\">\n                            <i class=\"bi bi-search text-warning\"></i>\n                            <span>记录查询</span>\n                        </a>\n                    </div>\n                    <div class=\"col-6\">\n                        <a href=\"";
output += runtime.suppressValue((lineno = 217, colno = 43, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["categories"])), env.opts.autoescape);
output += "\" class=\"quick-link\">\n                            <i class=\"bi bi-tags text-danger\"></i>\n                            <span>积分类别</span>\n                        </a>\n                    </div>\n                    <div class=\"col-12\">\n                        <a href=\"";
output += runtime.suppressValue((lineno = 223, colno = 43, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["export_data"])), env.opts.autoescape);
output += "\" class=\"quick-link border-primary border-opacity-25\"\n                            style=\"background: #f0f7ff;\">\n                            <i class=\"bi bi-cloud-download text-primary\"></i>\n                            <span class=\"text-primary fw-bold\">生成班级月度报表 (Excel)</span>\n                        </a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-lg-5\">\n        <div class=\"card border-0 shadow-sm h-100\">\n            <div class=\"card-header bg-white border-0 pt-4 px-4\">\n                <h5 class=\"fw-bold mb-0\">系统状态</h5>\n            </div>\n            <div class=\"card-body p-4 text-center d-flex flex-column justify-content-center\">\n                <div class=\"mb-3\">\n                    <i class=\"bi bi-shield-check text-success\" style=\"font-size: 3rem;\"></i>\n                </div>\n                <h6 class=\"fw-bold\">运行良好</h6>\n                <p class=\"small text-muted mb-4\">\n                    所有服务处于在线状态。您的班级数据已安全同步到 D1 数据库。\n                </p>\n                <div class=\"alert alert-warning border-0 small mb-0 text-start\">\n                    <i class=\"bi bi-exclamation-triangle-fill me-2\"></i>\n                    建议定期导出数据报表以确保离线备份。\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};
})();
precompiledTemplates["points_records.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "points_records.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <div class=\"d-flex justify-content-between align-items-center\">\n            <h1 class=\"h2\">积分记录</h1>\n            <a href=\"";
output += runtime.suppressValue((lineno = 7, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_points"])), env.opts.autoescape);
output += "\" class=\"btn btn-success\">\n                <i class=\"bi bi-plus-circle\"></i> 添加记录\n            </a>\n        </div>\n    </div>\n</div>\n\n<div class=\"row mb-3\">\n    <div class=\"col-md-6\">\n        <form method=\"GET\" class=\"d-flex\">\n            <input type=\"text\" name=\"search\" class=\"form-control me-2\" placeholder=\"搜索学生姓名或事由...\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "search"), env.opts.autoescape);
output += "\">\n            <button type=\"submit\" class=\"btn btn-outline-primary\">\n                <i class=\"bi bi-search\"></i>\n            </button>\n        </form>\n    </div>\n    <div class=\"col-md-6 text-end\">\n        <span class=\"text-muted\">\n            共找到 ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"total"), env.opts.autoescape);
output += " 条记录\n        </span>\n    </div>\n</div>\n\n";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"items")) {
output += "\n<div class=\"card\">\n    <div class=\"card-body p-0\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-hover mb-0\">\n                <thead class=\"table-light\">\n                    <tr>\n                        <th>学生信息</th>\n                        <th>积分</th>\n                        <th>事由</th>\n                        <th>类别</th>\n                        <th>操作人</th>\n                        <th>时间</th>\n                        <th>操作</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ";
frame = frame.push();
var t_10 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"items");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("record", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                    <tr>\n                        <td>\n                            <div class=\"d-flex align-items-center\">\n                                <div class=\"me-2\">\n                                    <i class=\"bi bi-person-circle fs-4 text-muted\"></i>\n                                </div>\n                                <div>\n                                    <a href=\"";
output += runtime.suppressValue((lineno = 55, colno = 55, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["student_trend",runtime.makeKeywordArgs({"id": runtime.memberLookup((runtime.memberLookup((t_11),"student")),"id")})])), env.opts.autoescape);
output += "\"\n                                        class=\"fw-bold text-decoration-none\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"student")),"name"), env.opts.autoescape);
output += "</a>\n                                    <br>\n                                    <small class=\"text-muted\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"student")),"class_name"), env.opts.autoescape);
output += "</small>\n                                </div>\n                            </div>\n                        </td>\n                        <td>\n                            ";
if(runtime.memberLookup((t_11),"points") > 0) {
output += "\n                            <span class=\"badge bg-success fs-6\">+";
output += runtime.suppressValue(runtime.memberLookup((t_11),"points"), env.opts.autoescape);
output += "</span>\n                            ";
;
}
else {
output += "\n                            <span class=\"badge bg-danger fs-6\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"points"), env.opts.autoescape);
output += "</span>\n                            ";
;
}
output += "\n                        </td>\n                        <td>\n                            <span title=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"reason") || (runtime.memberLookup((t_11),"category") + "积分记录"), env.opts.autoescape);
output += "\">\n                                ";
var t_12;
t_12 = runtime.memberLookup((t_11),"reason") || (runtime.memberLookup((t_11),"category") + "积分记录");
frame.set("display_reason", t_12, true);
if(frame.topLevel) {
context.setVariable("display_reason", t_12);
}
if(frame.topLevel) {
context.addExport("display_reason", t_12);
}
output += "\n                                ";
output += runtime.suppressValue(env.getFilter("truncate").call(context, runtime.contextOrFrameLookup(context, frame, "display_reason"),20,runtime.contextOrFrameLookup(context, frame, "True"),""), env.opts.autoescape);
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "display_reason")) > 20) {
output += "...";
;
}
output += "\n                            </span>\n                        </td>\n                        <td><span class=\"badge bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"category"), env.opts.autoescape);
output += "</span></td>\n                        <td>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"operator") || "-", env.opts.autoescape);
output += "</td>\n                        <td>\n                            <div class=\"small\">\n                                <div>";
output += runtime.suppressValue((lineno = 80, colno = 66, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_11),"created_at")),"strftime"), "record[\"created_at\"][\"strftime\"]", context, ["%m-%d %H:%M"])), env.opts.autoescape);
output += "</div>\n                                <div class=\"text-muted\">";
output += runtime.suppressValue((lineno = 81, colno = 85, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_11),"created_at")),"strftime"), "record[\"created_at\"][\"strftime\"]", context, ["%Y-%m-%d"])), env.opts.autoescape);
output += "</div>\n                            </div>\n                        </td>\n                        <td>\n                            <div class=\"btn-group btn-group-sm\">\n                                <a href=\"";
output += runtime.suppressValue((lineno = 86, colno = 51, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["student_trend",runtime.makeKeywordArgs({"id": runtime.memberLookup((runtime.memberLookup((t_11),"student")),"id")})])), env.opts.autoescape);
output += "\"\n                                    class=\"btn btn-outline-primary\" title=\"查看趋势分析\">\n                                    <i class=\"bi bi-graph-up\"></i>\n                                </a>\n                                <button class=\"btn btn-outline-info\" onclick=\"showRecordDetail(";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += ")\"\n                                    title=\"查看详情\">\n                                    <i class=\"bi bi-eye\"></i>\n                                </button>\n                                ";
var t_13;
t_13 = runtime.memberLookup((t_11),"points") > 0;
frame.set("is_positive", t_13, true);
if(frame.topLevel) {
context.setVariable("is_positive", t_13);
}
if(frame.topLevel) {
context.addExport("is_positive", t_13);
}
output += "\n                                <form method=\"POST\"\n                                    action=\"";
output += runtime.suppressValue((lineno = 96, colno = 54, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["revert_points_record",runtime.makeKeywordArgs({"record_id": runtime.memberLookup((t_11),"id"),"page": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"page"),"search": runtime.contextOrFrameLookup(context, frame, "search")})])), env.opts.autoescape);
output += "\"\n                                    class=\"d-inline\"\n                                    onsubmit=\"return confirm('确定要撤回这条";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "is_positive")?"加分":"扣分"), env.opts.autoescape);
output += "记录吗？');\">\n                                    <button type=\"submit\" class=\"btn btn-outline-danger btn-sm\"\n                                        title=\"撤回";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "is_positive")?"加分":"扣分"), env.opts.autoescape);
output += "\">\n                                        <i class=\"bi bi-arrow-counterclockwise\"></i>\n                                    </button>\n                                </form>\n                            </div>\n                        </td>\n                    </tr>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n<!-- 分页 -->\n";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"pages") > 1) {
output += "\n<nav class=\"mt-4\">\n    <ul class=\"pagination justify-content-center\">\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"has_prev")) {
output += "\n        <li class=\"page-item\">\n            <a class=\"page-link\" href=\"";
output += runtime.suppressValue((lineno = 120, colno = 49, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["points_records",runtime.makeKeywordArgs({"page": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"prev_num"),"search": runtime.contextOrFrameLookup(context, frame, "search")})])), env.opts.autoescape);
output += "\">上一页</a>\n        </li>\n        ";
;
}
output += "\n\n        ";
frame = frame.push();
var t_16 = (lineno = 124, colno = 45, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"iter_pages"), "records[\"iter_pages\"]", context, []));
if(t_16) {t_16 = runtime.fromIterator(t_16);
var t_15 = t_16.length;
for(var t_14=0; t_14 < t_16.length; t_14++) {
var t_17 = t_16[t_14];
frame.set("page_num", t_17);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
output += "\n        ";
if(t_17) {
output += "\n        ";
if(t_17 != runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"page")) {
output += "\n        <li class=\"page-item\">\n            <a class=\"page-link\" href=\"";
output += runtime.suppressValue((lineno = 128, colno = 49, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["points_records",runtime.makeKeywordArgs({"page": t_17,"search": runtime.contextOrFrameLookup(context, frame, "search")})])), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(t_17, env.opts.autoescape);
output += "</a>\n        </li>\n        ";
;
}
else {
output += "\n        <li class=\"page-item active\">\n            <span class=\"page-link\">";
output += runtime.suppressValue(t_17, env.opts.autoescape);
output += "</span>\n        </li>\n        ";
;
}
output += "\n        ";
;
}
else {
output += "\n        <li class=\"page-item disabled\">\n            <span class=\"page-link\">...</span>\n        </li>\n        ";
;
}
output += "\n        ";
;
}
}
frame = frame.pop();
output += "\n\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"has_next")) {
output += "\n        <li class=\"page-item\">\n            <a class=\"page-link\" href=\"";
output += runtime.suppressValue((lineno = 144, colno = 49, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["points_records",runtime.makeKeywordArgs({"page": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "records")),"next_num"),"search": runtime.contextOrFrameLookup(context, frame, "search")})])), env.opts.autoescape);
output += "\">下一页</a>\n        </li>\n        ";
;
}
output += "\n    </ul>\n</nav>\n";
;
}
output += "\n";
;
}
else {
output += "\n<div class=\"card\">\n    <div class=\"card-body text-center py-5\">\n        <i class=\"bi bi-inbox fs-1 text-muted\"></i>\n        <h5 class=\"mt-3 text-muted\">暂无积分记录</h5>\n        <p class=\"text-muted\">开始添加积分记录来追踪学生表现</p>\n        <a href=\"";
output += runtime.suppressValue((lineno = 156, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_points"])), env.opts.autoescape);
output += "\" class=\"btn btn-success\">\n            <i class=\"bi bi-plus-circle-fill\"></i> 添加第一条记录\n        </a>\n    </div>\n</div>\n";
;
}
output += "\n\n<!-- 记录详情模态框 -->\n<div class=\"modal fade\" id=\"recordDetailModal\" tabindex=\"-1\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">积分记录详情</h5>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n            </div>\n            <div class=\"modal-body\" id=\"recordDetailContent\">\n                <!-- 动态加载内容 -->\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">关闭</button>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 182;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script>\n    async function showRecordDetail(recordId) {\n        try {\n            const response = await fetch(`/api/record/${recordId}`);\n            const record = await response.json();\n\n            const pointsClass = record.points >= 0 ? 'points-positive' : 'points-negative';\n            const pointsSign = record.points >= 0 ? '+' : '';\n\n            document.getElementById('recordDetailContent').innerHTML = `\n            <div class=\"row\">\n                <div class=\"col-sm-4\"><strong>学生姓名：</strong></div>\n                <div class=\"col-sm-8\">${record.student_name}</div>\n            </div>\n            <div class=\"row mt-2\">\n                <div class=\"col-sm-4\"><strong>班级：</strong></div>\n                <div class=\"col-sm-8\">${record.class_name}</div>\n            </div>\n            <hr>\n            <div class=\"row mt-2\">\n                <div class=\"col-sm-4\"><strong>积分：</strong></div>\n                <div class=\"col-sm-8\"><span class=\"${pointsClass}\">${pointsSign}${record.points}</span></div>\n            </div>\n            <div class=\"row mt-2\">\n                <div class=\"col-sm-4\"><strong>类别：</strong></div>\n                <div class=\"col-sm-8\">${record.category}</div>\n            </div>\n            <div class=\"row mt-2\">\n                <div class=\"col-sm-4\"><strong>事由：</strong></div>\n                <div class=\"col-sm-8\">${record.reason}</div>\n            </div>\n            <div class=\"row mt-2\">\n                <div class=\"col-sm-4\"><strong>操作人：</strong></div>\n                <div class=\"col-sm-8\">${record.operator}</div>\n            </div>\n            <div class=\"row mt-2\">\n                <div class=\"col-sm-4\"><strong>记录时间：</strong></div>\n                <div class=\"col-sm-8\">${record.created_at}</div>\n            </div>\n        `;\n\n            new bootstrap.Modal(document.getElementById('recordDetailModal')).show();\n        } catch (error) {\n            console.error('获取记录详情失败:', error);\n            alert('获取记录详情失败，请稍后重试');\n        }\n    }\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};
})();
precompiledTemplates["rankings.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "rankings.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <div class=\"d-flex justify-content-between align-items-center\">\n            <div>\n                <h1 class=\"h2\">\n                    <i class=\"bi bi-trophy-fill text-warning\"></i> 积分排名统计\n                </h1>\n                <p class=\"text-muted\">查看学生个人积分排名和小组平均分排名，支持日期区间筛选</p>\n            </div>\n            <div>\n                <button class=\"btn btn-outline-primary\" onclick=\"refreshData()\">\n                    <i class=\"bi bi-arrow-clockwise\"></i> 刷新数据\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- 日期筛选表单 -->\n<div class=\"card mb-4\">\n    <div class=\"card-header\">\n        <h5 class=\"mb-0\">\n            <i class=\"bi bi-calendar-check\"></i> 日期区间筛选\n        </h5>\n    </div>\n    <div class=\"card-body\">\n        <form method=\"GET\" action=\"";
output += runtime.suppressValue((lineno = 29, colno = 45, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["rankings"])), env.opts.autoescape);
output += "\" class=\"row g-3\" id=\"dateFilterForm\">\n            <div class=\"col-md-4\">\n                <label for=\"start_date\" class=\"form-label\">开始日期</label>\n                <input type=\"date\" class=\"form-control\" id=\"start_date\" name=\"start_date\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "start_date"), env.opts.autoescape);
output += "\">\n            </div>\n            <div class=\"col-md-4\">\n                <label for=\"end_date\" class=\"form-label\">结束日期</label>\n                <input type=\"date\" class=\"form-control\" id=\"end_date\" name=\"end_date\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "end_date"), env.opts.autoescape);
output += "\">\n            </div>\n            <div class=\"col-md-4\">\n                <label class=\"form-label\">&nbsp;</label>\n                <div>\n                    <button type=\"submit\" class=\"btn btn-primary\">\n                        <i class=\"bi bi-search\"></i> 应用筛选\n                    </button>\n                    <a href=\"";
output += runtime.suppressValue((lineno = 44, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["rankings"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-secondary\">\n                        <i class=\"bi bi-x-circle\"></i> 清除\n                    </a>\n                </div>\n            </div>\n        </form>\n\n        ";
if(runtime.contextOrFrameLookup(context, frame, "start_date") && runtime.contextOrFrameLookup(context, frame, "end_date")) {
output += "\n        <div class=\"mt-3 p-3 bg-light rounded\">\n            <div class=\"row text-center\">\n                <div class=\"col-md-4\">\n                    <div class=\"h5 mb-1 text-primary\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "start_date"), env.opts.autoescape);
output += " 至 ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "end_date"), env.opts.autoescape);
output += "</div>\n                    <small class=\"text-muted\">筛选区间</small>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"h5 mb-1 text-success\">";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "student_ranking")), env.opts.autoescape);
output += "</div>\n                    <small class=\"text-muted\">参与学生</small>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"h5 mb-1 text-info\">";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "group_ranking")), env.opts.autoescape);
output += "</div>\n                    <small class=\"text-muted\">活跃小组</small>\n                </div>\n            </div>\n        </div>\n        ";
;
}
output += "\n    </div>\n</div>\n\n<!-- 排名切换标签 -->\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <ul class=\"nav nav-tabs\" id=\"rankingTabs\" role=\"tablist\">\n            <li class=\"nav-item\" role=\"presentation\">\n                <button class=\"nav-link active\" id=\"student-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#student\"\n                    type=\"button\" role=\"tab\">\n                    <i class=\"bi bi-person-fill\"></i> 学生排名\n                </button>\n            </li>\n            <li class=\"nav-item\" role=\"presentation\">\n                <button class=\"nav-link\" id=\"group-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#group\" type=\"button\"\n                    role=\"tab\">\n                    <i class=\"bi bi-collection-fill\"></i> 小组排名\n                </button>\n            </li>\n            <li class=\"nav-item\" role=\"presentation\">\n                <button class=\"nav-link\" id=\"week-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#week\" type=\"button\"\n                    role=\"tab\">\n                    <i class=\"bi bi-calendar-week\"></i> 本周排行\n                </button>\n            </li>\n            ";
if(runtime.contextOrFrameLookup(context, frame, "start_date") && runtime.contextOrFrameLookup(context, frame, "end_date")) {
output += "\n            <li class=\"nav-item\" role=\"presentation\">\n                <button class=\"nav-link\" id=\"range-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#range\" type=\"button\"\n                    role=\"tab\">\n                    <i class=\"bi bi-calendar-range\"></i> 区间排行\n                </button>\n            </li>\n            ";
;
}
output += "\n            <li class=\"nav-item\" role=\"presentation\">\n                <button class=\"nav-link\" id=\"progress-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#progress\" type=\"button\"\n                    role=\"tab\">\n                    <i class=\"bi bi-graph-up-arrow\"></i> 进步榜\n                </button>\n            </li>\n        </ul>\n    </div>\n</div>\n\n<div class=\"tab-content\" id=\"rankingTabsContent\">\n    <!-- 学生排名 -->\n    <div class=\"tab-pane fade show active\" id=\"student\" role=\"tabpanel\">\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-trophy-fill text-warning\"></i> 学生总积分排名\n                        </h5>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-hover\">\n                                <thead class=\"table-light\">\n                                    <tr>\n                                        <th width=\"80\">排名</th>\n                                        <th>学生信息</th>\n                                        <th>班级</th>\n                                        <th width=\"120\">总积分</th>\n                                        <th width=\"120\">本周积分</th>\n                                        ";
if(runtime.contextOrFrameLookup(context, frame, "start_date") && runtime.contextOrFrameLookup(context, frame, "end_date")) {
output += "\n                                        <th width=\"120\">区间积分</th>\n                                        ";
;
}
output += "\n                                        <th width=\"100\">小组</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "student_ranking");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("item", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                                    <tr class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") <= 3) {
output += "table-warning";
;
}
output += "\">\n                                        <td>\n                                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 1) {
output += "\n                                            <i class=\"bi bi-award-fill text-warning fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 2) {
output += "\n                                            <i class=\"bi bi-award-fill text-secondary fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 3) {
output += "\n                                            <i class=\"bi bi-award-fill\" style=\"color: #CD7F32;\" class=\"fs-4\"></i>\n                                            ";
;
}
else {
output += "\n                                            <span class=\"badge bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "</span>\n                                            ";
;
}
;
}
;
}
output += "\n                                        </td>\n                                        <td>\n                                            <div class=\"d-flex align-items-center\">\n                                                <img src=\"";
output += runtime.suppressValue((lineno = 155, colno = 71, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "avatar_url"), "avatar_url", context, [runtime.memberLookup((runtime.memberLookup((t_11),"student")),"id")])), env.opts.autoescape);
output += "\"\n                                                    alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"student")),"name"), env.opts.autoescape);
output += "\" class=\"avatar me-2\">\n                                                <div>\n                                                    <a href=\"";
output += runtime.suppressValue((lineno = 158, colno = 71, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["student_trend",runtime.makeKeywordArgs({"id": runtime.memberLookup((runtime.memberLookup((t_11),"student")),"id")})])), env.opts.autoescape);
output += "\"\n                                                        class=\"text-decoration-none\">\n                                                        <strong>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"student")),"name"), env.opts.autoescape);
output += "</strong>\n                                                    </a>\n                                                    <br>\n                                                </div>\n                                            </div>\n                                        </td>\n                                        <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"student")),"class_name"), env.opts.autoescape);
output += "</td>\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_11),"total_points") >= 0) {
output += "bg-success";
;
}
else {
output += "bg-danger";
;
}
output += " fs-6\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"total_points"), env.opts.autoescape);
output += "分\n                                            </span>\n                                        </td>\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_11),"week_points") >= 0) {
output += "bg-info";
;
}
else {
output += "bg-warning";
;
}
output += "\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"week_points"), env.opts.autoescape);
output += "分\n                                            </span>\n                                        </td>\n                                        ";
if(runtime.contextOrFrameLookup(context, frame, "start_date") && runtime.contextOrFrameLookup(context, frame, "end_date")) {
output += "\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_11),"range_points") >= 0) {
output += "bg-success";
;
}
else {
output += "bg-danger";
;
}
output += "\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"range_points"), env.opts.autoescape);
output += "分\n                                            </span>\n                                        </td>\n                                        ";
;
}
output += "\n                                        <td>\n                                            ";
if(runtime.memberLookup((runtime.memberLookup((t_11),"student")),"group")) {
output += "\n                                            <span class=\"badge\"\n                                                style=\"background-color: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_11),"student")),"group")),"color"), env.opts.autoescape);
output += ";\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_11),"student")),"group")),"name"), env.opts.autoescape);
output += "\n                                            </span>\n                                            ";
;
}
else {
output += "\n                                            <span class=\"text-muted\">无</span>\n                                            ";
;
}
output += "\n                                        </td>\n                                    </tr>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </tbody>\n                            </table>\n                        </div>\n\n                        ";
if(!runtime.contextOrFrameLookup(context, frame, "student_ranking")) {
output += "\n                        <div class=\"text-center py-5\">\n                            <i class=\"bi bi-people text-muted\" style=\"font-size: 3rem;\"></i>\n                            <p class=\"text-muted\">暂无学生数据</p>\n                        </div>\n                        ";
;
}
output += "\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- 小组排名 -->\n    <div class=\"tab-pane fade\" id=\"group\" role=\"tabpanel\">\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-collection-fill text-primary\"></i> 小组平均分排名\n                        </h5>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"row\">\n                            ";
frame = frame.push();
var t_14 = runtime.contextOrFrameLookup(context, frame, "group_ranking");
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("item", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n                            <div class=\"col-xl-3 col-lg-4 col-md-6 mb-4\">\n                                <div class=\"card h-100 border-0 shadow-sm group-ranking-card\">\n                                    <div class=\"card-header d-flex justify-content-between align-items-center\"\n                                        style=\"background-color: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_15),"group")),"color"), env.opts.autoescape);
output += "20; border-left: 4px solid ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_15),"group")),"color"), env.opts.autoescape);
output += ";\">\n                                        <div class=\"d-flex align-items-center\">\n                                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 1) {
output += "\n                                            <i class=\"bi bi-award-fill text-warning me-2 fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 2) {
output += "\n                                            <i class=\"bi bi-award-fill text-secondary me-2 fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 3) {
output += "\n                                            <i class=\"bi bi-award-fill me-2 fs-4\" style=\"color: #CD7F32;\"></i>\n                                            ";
;
}
else {
output += "\n                                            <span class=\"badge bg-secondary me-2\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "</span>\n                                            ";
;
}
;
}
;
}
output += "\n                                            <div>\n                                                <h6 class=\"mb-0\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_15),"group")),"name"), env.opts.autoescape);
output += "</h6>\n                                                <small class=\"text-muted\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_15),"group")),"class_name"), env.opts.autoescape);
output += "</small>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"card-body text-center\">\n                                        <div class=\"row\">\n                                            <div class=\"col-6\">\n                                                <div class=\"mb-3\">\n                                                    <div class=\"h4 mb-0 text-primary\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.memberLookup((t_15),"average_points")), env.opts.autoescape);
output += "</div>\n                                                    <small class=\"text-muted\">平均积分</small>\n                                                </div>\n                                            </div>\n                                            <div class=\"col-6\">\n                                                <div class=\"mb-3\">\n                                                    <div class=\"h4 mb-0 text-success\">";
output += runtime.suppressValue((lineno = 259, colno = 112, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_15),"group")),"total_points"), "item[\"group\"][\"total_points\"]", context, [])), env.opts.autoescape);
output += "\n                                                    </div>\n                                                    <small class=\"text-muted\">总积分</small>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <div class=\"col-6\">\n                                                <div>\n                                                    <div class=\"h5 mb-0 text-info\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.memberLookup((t_15),"week_average_points")), env.opts.autoescape);
output += "</div>\n                                                    <small class=\"text-muted\">本周平均</small>\n                                                </div>\n                                            </div>\n                                            <div class=\"col-6\">\n                                                <div>\n                                                    <div class=\"h5 mb-0 text-warning\">";
output += runtime.suppressValue((lineno = 275, colno = 111, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_15),"group")),"week_points"), "item[\"group\"][\"week_points\"]", context, [])), env.opts.autoescape);
output += "\n                                                    </div>\n                                                    <small class=\"text-muted\">本周总分</small>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        ";
if(runtime.contextOrFrameLookup(context, frame, "start_date") && runtime.contextOrFrameLookup(context, frame, "end_date")) {
output += "\n                                        <div class=\"row mt-2\">\n                                            <div class=\"col-6\">\n                                                <div>\n                                                    <div class=\"h5 mb-0 text-success\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.memberLookup((t_15),"avg_range_points")), env.opts.autoescape);
output += "</div>\n                                                    <small class=\"text-muted\">区间平均</small>\n                                                </div>\n                                            </div>\n                                            <div class=\"col-6\">\n                                                <div>\n                                                    <div class=\"h5 mb-0 text-primary\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"total_range_points"), env.opts.autoescape);
output += "\n                                                    </div>\n                                                    <small class=\"text-muted\">区间总分</small>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        ";
;
}
output += "\n                                        <hr>\n                                        <div class=\"text-start\">\n                                            <small class=\"text-muted\">\n                                                <i class=\"bi bi-people-fill\"></i> ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((t_15),"group")),"students")), env.opts.autoescape);
output += "名成员\n                                            </small>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </div>\n\n                        ";
if(!runtime.contextOrFrameLookup(context, frame, "group_ranking")) {
output += "\n                        <div class=\"text-center py-5\">\n                            <i class=\"bi bi-collection text-muted\" style=\"font-size: 3rem;\"></i>\n                            <p class=\"text-muted\">暂无小组数据</p>\n                        </div>\n                        ";
;
}
output += "\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- 本周排行 -->\n    <div class=\"tab-pane fade\" id=\"week\" role=\"tabpanel\">\n        <div class=\"row\">\n            <div class=\"col-md-6\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h6 class=\"mb-0\">\n                            <i class=\"bi bi-calendar-week text-info\"></i> 本周学生排行\n                        </h6>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-sm\">\n                                <thead class=\"table-light\">\n                                    <tr>\n                                        <th width=\"60\">排名</th>\n                                        <th>学生</th>\n                                        <th width=\"80\">本周积分</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    ";
var t_16;
t_16 = env.getFilter("sort").call(context, runtime.contextOrFrameLookup(context, frame, "student_ranking"),runtime.makeKeywordArgs({"attribute": "week_points","reverse": true}));
frame.set("week_student_ranking", t_16, true);
if(frame.topLevel) {
context.setVariable("week_student_ranking", t_16);
}
if(frame.topLevel) {
context.addExport("week_student_ranking", t_16);
}
output += "\n                                    ";
frame = frame.push();
var t_19 = runtime.contextOrFrameLookup(context, frame, "week_student_ranking");
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("item", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "\n                                    <tr class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") <= 3) {
output += "table-info";
;
}
output += "\">\n                                        <td>\n                                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") <= 3) {
output += " <span\n                                                class=\"badge ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 1) {
output += "bg-warning";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 2) {
output += "bg-secondary";
;
}
else {
output += "bg-dark";
;
}
;
}
output += "\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\n                                                </span>\n                                                ";
;
}
else {
output += "\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\n                                                ";
;
}
output += "\n                                        </td>\n                                        <td>\n                                            <a href=\"";
output += runtime.suppressValue((lineno = 358, colno = 63, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["student_trend",runtime.makeKeywordArgs({"id": runtime.memberLookup((runtime.memberLookup((t_20),"student")),"id")})])), env.opts.autoescape);
output += "\"\n                                                class=\"text-decoration-none\">\n                                                <strong>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_20),"student")),"name"), env.opts.autoescape);
output += "</strong>\n                                            </a>\n                                            <br>\n                                            <small class=\"text-muted\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_20),"student")),"class_name"), env.opts.autoescape);
output += "</small>\n                                        </td>\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_20),"week_points") >= 0) {
output += "bg-success";
;
}
else {
output += "bg-danger";
;
}
output += "\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_20),"week_points"), env.opts.autoescape);
output += "\n                                            </span>\n                                        </td>\n                                    </tr>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"col-md-6\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h6 class=\"mb-0\">\n                            <i class=\"bi bi-collection-fill text-warning\"></i> 本周小组排行\n                        </h6>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-sm\">\n                                <thead class=\"table-light\">\n                                    <tr>\n                                        <th width=\"60\">排名</th>\n                                        <th>小组</th>\n                                        <th width=\"80\">本周平均</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    ";
var t_21;
t_21 = env.getFilter("sort").call(context, runtime.contextOrFrameLookup(context, frame, "group_ranking"),runtime.makeKeywordArgs({"attribute": "week_average_points","reverse": true}));
frame.set("week_group_ranking", t_21, true);
if(frame.topLevel) {
context.setVariable("week_group_ranking", t_21);
}
if(frame.topLevel) {
context.addExport("week_group_ranking", t_21);
}
output += "\n                                    ";
frame = frame.push();
var t_24 = runtime.contextOrFrameLookup(context, frame, "week_group_ranking");
if(t_24) {t_24 = runtime.fromIterator(t_24);
var t_23 = t_24.length;
for(var t_22=0; t_22 < t_24.length; t_22++) {
var t_25 = t_24[t_22];
frame.set("item", t_25);
frame.set("loop.index", t_22 + 1);
frame.set("loop.index0", t_22);
frame.set("loop.revindex", t_23 - t_22);
frame.set("loop.revindex0", t_23 - t_22 - 1);
frame.set("loop.first", t_22 === 0);
frame.set("loop.last", t_22 === t_23 - 1);
frame.set("loop.length", t_23);
output += "\n                                    <tr class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") <= 3) {
output += "table-warning";
;
}
output += "\">\n                                        <td>\n                                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") <= 3) {
output += " <span\n                                                class=\"badge ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 1) {
output += "bg-warning";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 2) {
output += "bg-secondary";
;
}
else {
output += "bg-dark";
;
}
;
}
output += "\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\n                                                </span>\n                                                ";
;
}
else {
output += "\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\n                                                ";
;
}
output += "\n                                        </td>\n                                        <td>\n                                            <div class=\"d-flex align-items-center\">\n                                                <div class=\"rounded me-2\"\n                                                    style=\"width: 16px; height: 16px; background-color: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_25),"group")),"color"), env.opts.autoescape);
output += ";\">\n                                                </div>\n                                                <strong>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_25),"group")),"name"), env.opts.autoescape);
output += "</strong>\n                                            </div>\n                                            <small class=\"text-muted\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_25),"group")),"class_name"), env.opts.autoescape);
output += "</small>\n                                        </td>\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_25),"week_average_points") >= 0) {
output += "bg-success";
;
}
else {
output += "bg-danger";
;
}
output += "\">\n                                                ";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.memberLookup((t_25),"week_average_points")), env.opts.autoescape);
output += "\n                                            </span>\n                                        </td>\n                                    </tr>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- 统计摘要 -->\n        <div class=\"row mt-4\">\n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h6 class=\"mb-0\">\n                            <i class=\"bi bi-bar-chart-fill\"></i> 本周统计摘要\n                        </h6>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-3\">\n                                <div class=\"text-center p-3 bg-light rounded\">\n                                    <div class=\"h4 mb-0 text-primary\">";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "student_ranking")), env.opts.autoescape);
output += "</div>\n                                    <small class=\"text-muted\">参与学生</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3\">\n                                <div class=\"text-center p-3 bg-light rounded\">\n                                    <div class=\"h4 mb-0 text-success\">";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "group_ranking")), env.opts.autoescape);
output += "</div>\n                                    <small class=\"text-muted\">活跃小组</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3\">\n                                <div class=\"text-center p-3 bg-light rounded\">\n                                    <div class=\"h4 mb-0 text-info\">\n                                        ";
var t_26;
t_26 = 0;
frame.set("total_week_points", t_26, true);
if(frame.topLevel) {
context.setVariable("total_week_points", t_26);
}
if(frame.topLevel) {
context.addExport("total_week_points", t_26);
}
output += "\n                                        ";
frame = frame.push();
var t_29 = runtime.contextOrFrameLookup(context, frame, "student_ranking");
if(t_29) {t_29 = runtime.fromIterator(t_29);
var t_28 = t_29.length;
for(var t_27=0; t_27 < t_29.length; t_27++) {
var t_30 = t_29[t_27];
frame.set("item", t_30);
frame.set("loop.index", t_27 + 1);
frame.set("loop.index0", t_27);
frame.set("loop.revindex", t_28 - t_27);
frame.set("loop.revindex0", t_28 - t_27 - 1);
frame.set("loop.first", t_27 === 0);
frame.set("loop.last", t_27 === t_28 - 1);
frame.set("loop.length", t_28);
output += "\n                                        ";
var t_31;
t_31 = runtime.contextOrFrameLookup(context, frame, "total_week_points") + runtime.memberLookup((t_30),"week_points");
frame.set("total_week_points", t_31, true);
if(frame.topLevel) {
context.setVariable("total_week_points", t_31);
}
if(frame.topLevel) {
context.addExport("total_week_points", t_31);
}
output += "\n                                        ";
;
}
}
frame = frame.pop();
output += "\n                                        ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "total_week_points"), env.opts.autoescape);
output += "\n                                    </div>\n                                    <small class=\"text-muted\">本周总积分</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3\">\n                                <div class=\"text-center p-3 bg-light rounded\">\n                                    <div class=\"h4 mb-0 text-warning\">\n                                        ";
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "student_ranking")) > 0) {
output += "\n                                        ";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.contextOrFrameLookup(context, frame, "total_week_points") / (env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "student_ranking")))), env.opts.autoescape);
output += "\n                                        ";
;
}
else {
output += "\n                                        0.0\n                                        ";
;
}
output += "\n                                    </div>\n                                    <small class=\"text-muted\">本周平均</small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!-- 区间排行 -->\n    ";
if(runtime.contextOrFrameLookup(context, frame, "start_date") && runtime.contextOrFrameLookup(context, frame, "end_date")) {
output += "\n    <div class=\"tab-pane fade\" id=\"range\" role=\"tabpanel\">\n        <div class=\"row\">\n            <!-- 区间学生排行 -->\n            <div class=\"col-lg-6 mb-4\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-person-fill text-success\"></i> 区间学生排行\n                        </h5>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-hover\">\n                                <thead class=\"table-light\">\n                                    <tr>\n                                        <th width=\"80\">排名</th>\n                                        <th>学生信息</th>\n                                        <th>班级</th>\n                                        <th width=\"120\">区间积分</th>\n                                        <th width=\"100\">小组</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    ";
var t_32;
t_32 = env.getFilter("sort").call(context, runtime.contextOrFrameLookup(context, frame, "student_ranking"),runtime.makeKeywordArgs({"attribute": "range_points","reverse": true}));
frame.set("range_student_ranking", t_32, true);
if(frame.topLevel) {
context.setVariable("range_student_ranking", t_32);
}
if(frame.topLevel) {
context.addExport("range_student_ranking", t_32);
}
output += "\n                                    ";
frame = frame.push();
var t_35 = runtime.contextOrFrameLookup(context, frame, "range_student_ranking");
if(t_35) {t_35 = runtime.fromIterator(t_35);
var t_34 = t_35.length;
for(var t_33=0; t_33 < t_35.length; t_33++) {
var t_36 = t_35[t_33];
frame.set("item", t_36);
frame.set("loop.index", t_33 + 1);
frame.set("loop.index0", t_33);
frame.set("loop.revindex", t_34 - t_33);
frame.set("loop.revindex0", t_34 - t_33 - 1);
frame.set("loop.first", t_33 === 0);
frame.set("loop.last", t_33 === t_34 - 1);
frame.set("loop.length", t_34);
output += "\n                                    <tr class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") <= 3) {
output += "table-success";
;
}
output += "\">\n                                        <td>\n                                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 1) {
output += "\n                                            <i class=\"bi bi-award-fill text-warning fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 2) {
output += "\n                                            <i class=\"bi bi-award-fill text-secondary fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 3) {
output += "\n                                            <i class=\"bi bi-award-fill\" style=\"color: #CD7F32;\" class=\"fs-4\"></i>\n                                            ";
;
}
else {
output += "\n                                            <span class=\"badge bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "</span>\n                                            ";
;
}
;
}
;
}
output += "\n                                        </td>\n                                        <td>\n                                            <div class=\"d-flex align-items-center\">\n                                                <img src=\"";
output += runtime.suppressValue((lineno = 532, colno = 71, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "avatar_url"), "avatar_url", context, [runtime.memberLookup((runtime.memberLookup((t_36),"student")),"id")])), env.opts.autoescape);
output += "\"\n                                                    alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_36),"student")),"name"), env.opts.autoescape);
output += "\" class=\"avatar me-2\">\n                                                <div>\n                                                    <a href=\"";
output += runtime.suppressValue((lineno = 535, colno = 71, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["student_trend",runtime.makeKeywordArgs({"id": runtime.memberLookup((runtime.memberLookup((t_36),"student")),"id")})])), env.opts.autoescape);
output += "\"\n                                                        class=\"text-decoration-none\">\n                                                        <strong>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_36),"student")),"name"), env.opts.autoescape);
output += "</strong>\n                                                    </a>\n                                                    <br>\n                                                </div>\n                                            </div>\n                                        </td>\n                                        <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_36),"student")),"class_name"), env.opts.autoescape);
output += "</td>\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_36),"range_points") >= 0) {
output += "bg-success";
;
}
else {
output += "bg-danger";
;
}
output += " fs-6\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_36),"range_points"), env.opts.autoescape);
output += "分\n                                            </span>\n                                        </td>\n                                        <td>\n                                            ";
if(runtime.memberLookup((runtime.memberLookup((t_36),"student")),"group")) {
output += "\n                                            <span class=\"badge\"\n                                                style=\"background-color: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_36),"student")),"group")),"color"), env.opts.autoescape);
output += ";\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_36),"student")),"group")),"name"), env.opts.autoescape);
output += "\n                                            </span>\n                                            ";
;
}
else {
output += "\n                                            <span class=\"text-muted\">无</span>\n                                            ";
;
}
output += "\n                                        </td>\n                                    </tr>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- 区间小组排行 -->\n            <div class=\"col-lg-6 mb-4\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-collection-fill text-primary\"></i> 区间小组排行\n                        </h5>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-hover\">\n                                <thead class=\"table-light\">\n                                    <tr>\n                                        <th width=\"80\">排名</th>\n                                        <th>小组信息</th>\n                                        <th width=\"120\">区间平均分</th>\n                                        <th width=\"120\">区间总分</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    ";
var t_37;
t_37 = env.getFilter("sort").call(context, runtime.contextOrFrameLookup(context, frame, "group_ranking"),runtime.makeKeywordArgs({"attribute": "avg_range_points","reverse": true}));
frame.set("range_group_ranking", t_37, true);
if(frame.topLevel) {
context.setVariable("range_group_ranking", t_37);
}
if(frame.topLevel) {
context.addExport("range_group_ranking", t_37);
}
output += "\n                                    ";
frame = frame.push();
var t_40 = runtime.contextOrFrameLookup(context, frame, "range_group_ranking");
if(t_40) {t_40 = runtime.fromIterator(t_40);
var t_39 = t_40.length;
for(var t_38=0; t_38 < t_40.length; t_38++) {
var t_41 = t_40[t_38];
frame.set("item", t_41);
frame.set("loop.index", t_38 + 1);
frame.set("loop.index0", t_38);
frame.set("loop.revindex", t_39 - t_38);
frame.set("loop.revindex0", t_39 - t_38 - 1);
frame.set("loop.first", t_38 === 0);
frame.set("loop.last", t_38 === t_39 - 1);
frame.set("loop.length", t_39);
output += "\n                                    <tr class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") <= 3) {
output += "table-primary";
;
}
output += "\">\n                                        <td>\n                                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 1) {
output += "\n                                            <i class=\"bi bi-award-fill text-warning fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 2) {
output += "\n                                            <i class=\"bi bi-award-fill text-secondary fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 3) {
output += "\n                                            <i class=\"bi bi-award-fill\" style=\"color: #CD7F32;\" class=\"fs-4\"></i>\n                                            ";
;
}
else {
output += "\n                                            <span class=\"badge bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "</span>\n                                            ";
;
}
;
}
;
}
output += "\n                                        </td>\n                                        <td>\n                                            <div class=\"d-flex align-items-center\">\n                                                <div class=\"rounded me-2\"\n                                                    style=\"width: 16px; height: 16px; background-color: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_41),"group")),"color"), env.opts.autoescape);
output += ";\">\n                                                </div>\n                                                <div>\n                                                    <strong>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_41),"group")),"name"), env.opts.autoescape);
output += "</strong>\n                                                    <br>\n                                                    <small class=\"text-muted\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_41),"group")),"class_name"), env.opts.autoescape);
output += "</small>\n                                                </div>\n                                            </div>\n                                            <small class=\"text-muted\">\n                                                <i class=\"bi bi-people-fill\"></i> ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((t_41),"group")),"students")), env.opts.autoescape);
output += "名成员\n                                            </small>\n                                        </td>\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_41),"avg_range_points") >= 0) {
output += "bg-success";
;
}
else {
output += "bg-danger";
;
}
output += " fs-6\">\n                                                ";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.memberLookup((t_41),"avg_range_points")), env.opts.autoescape);
output += "分\n                                            </span>\n                                        </td>\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_41),"total_range_points") >= 0) {
output += "bg-info";
;
}
else {
output += "bg-warning";
;
}
output += "\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_41),"total_range_points"), env.opts.autoescape);
output += "分\n                                            </span>\n                                        </td>\n                                    </tr>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- 区间统计摘要 -->\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-bar-chart-fill\"></i> 区间统计摘要\n                        </h5>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"row\">\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"text-center p-3 bg-primary text-white rounded\">\n                                    <div class=\"h4 mb-0\">\n                                        ";
var t_42;
t_42 = env.getFilter("sum").call(context, runtime.contextOrFrameLookup(context, frame, "student_ranking"),runtime.makeKeywordArgs({"attribute": "range_points"}));
frame.set("total_range_points", t_42, true);
if(frame.topLevel) {
context.setVariable("total_range_points", t_42);
}
if(frame.topLevel) {
context.addExport("total_range_points", t_42);
}
output += "\n                                        ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "total_range_points"), env.opts.autoescape);
output += "\n                                    </div>\n                                    <small>区间总积分</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"text-center p-3 bg-success text-white rounded\">\n                                    <div class=\"h4 mb-0\">\n                                        ";
var t_43;
t_43 = (runtime.contextOrFrameLookup(context, frame, "student_ranking")?(runtime.contextOrFrameLookup(context, frame, "total_range_points") / env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "student_ranking"))):0);
frame.set("avg_range_points", t_43, true);
if(frame.topLevel) {
context.setVariable("avg_range_points", t_43);
}
if(frame.topLevel) {
context.addExport("avg_range_points", t_43);
}
output += "\n                                        ";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.contextOrFrameLookup(context, frame, "avg_range_points")), env.opts.autoescape);
output += "\n                                    </div>\n                                    <small>区间平均分</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"text-center p-3 bg-info text-white rounded\">\n                                    <div class=\"h4 mb-0\">\n                                        ";
var t_44;
t_44 = (runtime.contextOrFrameLookup(context, frame, "range_group_ranking")?runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "range_group_ranking")),0)),"avg_range_points"):0);
frame.set("top_group_avg", t_44, true);
if(frame.topLevel) {
context.setVariable("top_group_avg", t_44);
}
if(frame.topLevel) {
context.addExport("top_group_avg", t_44);
}
output += "\n                                        ";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.contextOrFrameLookup(context, frame, "top_group_avg")), env.opts.autoescape);
output += "\n                                    </div>\n                                    <small>最高小组平均分</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"text-center p-3 bg-warning text-white rounded\">\n                                    <div class=\"h4 mb-0\">\n                                        ";
var t_45;
t_45 = (runtime.contextOrFrameLookup(context, frame, "range_student_ranking")?runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "range_student_ranking")),0)),"range_points"):0);
frame.set("top_student_points", t_45, true);
if(frame.topLevel) {
context.setVariable("top_student_points", t_45);
}
if(frame.topLevel) {
context.addExport("top_student_points", t_45);
}
output += "\n                                        ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "top_student_points"), env.opts.autoescape);
output += "\n                                    </div>\n                                    <small>最高个人积分</small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ";
;
}
output += "\n\n    <!-- 进步榜 -->\n    <div class=\"tab-pane fade\" id=\"progress\" role=\"tabpanel\">\n        <div class=\"row mb-4\">\n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-sliders\"></i> 进步榜时间区间设置\n                        </h5>\n                    </div>\n                    <div class=\"card-body\">\n                        <form method=\"GET\" action=\"";
output += runtime.suppressValue((lineno = 710, colno = 61, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["rankings"])), env.opts.autoescape);
output += "\" class=\"row g-3\" id=\"progressForm\">\n                            <!-- 保留原有筛选参数 -->\n                            <input type=\"hidden\" name=\"start_date\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "start_date"), env.opts.autoescape);
output += "\">\n                            <input type=\"hidden\" name=\"end_date\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "end_date"), env.opts.autoescape);
output += "\">\n\n                            <div class=\"col-12\">\n                                <div class=\"alert alert-info mb-3\">\n                                    <i class=\"bi bi-info-circle\"></i>\n                                    进步榜对比学生在两个时间区间内的排名变化。选择A区间（基准期）和B区间（对比期），系统将计算学生在B区间相对于A区间的排名进步情况。\n                                </div>\n                            </div>\n\n                            <div class=\"col-md-6\">\n                                <div class=\"card bg-light\">\n                                    <div class=\"card-header\">\n                                        <strong><i class=\"bi bi-calendar-check text-secondary\"></i> A区间（基准期）</strong>\n                                    </div>\n                                    <div class=\"card-body\">\n                                        <div class=\"row g-2\">\n                                            <div class=\"col-6\">\n                                                <label for=\"progress_a_start\" class=\"form-label\">开始日期</label>\n                                                <input type=\"date\" class=\"form-control\" id=\"progress_a_start\"\n                                                    name=\"progress_a_start\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "progress_a_start"), env.opts.autoescape);
output += "\">\n                                            </div>\n                                            <div class=\"col-6\">\n                                                <label for=\"progress_a_end\" class=\"form-label\">结束日期</label>\n                                                <input type=\"date\" class=\"form-control\" id=\"progress_a_end\"\n                                                    name=\"progress_a_end\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "progress_a_end"), env.opts.autoescape);
output += "\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"col-md-6\">\n                                <div class=\"card bg-light\">\n                                    <div class=\"card-header\">\n                                        <strong><i class=\"bi bi-calendar-check text-primary\"></i> B区间（对比期）</strong>\n                                    </div>\n                                    <div class=\"card-body\">\n                                        <div class=\"row g-2\">\n                                            <div class=\"col-6\">\n                                                <label for=\"progress_b_start\" class=\"form-label\">开始日期</label>\n                                                <input type=\"date\" class=\"form-control\" id=\"progress_b_start\"\n                                                    name=\"progress_b_start\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "progress_b_start"), env.opts.autoescape);
output += "\">\n                                            </div>\n                                            <div class=\"col-6\">\n                                                <label for=\"progress_b_end\" class=\"form-label\">结束日期</label>\n                                                <input type=\"date\" class=\"form-control\" id=\"progress_b_end\"\n                                                    name=\"progress_b_end\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "progress_b_end"), env.opts.autoescape);
output += "\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"col-12 text-center mt-3\">\n                                <button type=\"submit\" class=\"btn btn-primary\" id=\"progressSubmitBtn\">\n                                    <i class=\"bi bi-search\"></i> 计算进步榜\n                                </button>\n                                <a href=\"";
output += runtime.suppressValue((lineno = 770, colno = 51, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["rankings"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-secondary\">\n                                    <i class=\"bi bi-x-circle\"></i> 清除\n                                </a>\n                            </div>\n                        </form>\n\n                        <!-- 进步榜结果容器（用于 AJAX 更新） -->\n                        <div id=\"progressResults\" class=\"mt-4\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        ";
if(runtime.contextOrFrameLookup(context, frame, "progress_ranking") && env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "progress_ranking")) > 0) {
output += "\n        <!-- 进步榜统计摘要 -->\n        <div class=\"row mb-4\">\n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-bar-chart-fill\"></i> 进步榜统计\n                        </h5>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"row text-center\">\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"p-3 bg-success text-white rounded\">\n                                    <div class=\"h4 mb-0\">\n                                        ";
var t_46;
t_46 = env.getFilter("length").call(context, env.getFilter("list").call(context, env.getFilter("selectattr").call(context, runtime.contextOrFrameLookup(context, frame, "progress_ranking"),"rank_change","gt",0)));
frame.set("improved_count", t_46, true);
if(frame.topLevel) {
context.setVariable("improved_count", t_46);
}
if(frame.topLevel) {
context.addExport("improved_count", t_46);
}
output += "\n                                        ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "improved_count"), env.opts.autoescape);
output += "\n                                    </div>\n                                    <small>进步学生数</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"p-3 bg-danger text-white rounded\">\n                                    <div class=\"h4 mb-0\">\n                                        ";
var t_47;
t_47 = env.getFilter("length").call(context, env.getFilter("list").call(context, env.getFilter("selectattr").call(context, runtime.contextOrFrameLookup(context, frame, "progress_ranking"),"rank_change","lt",0)));
frame.set("declined_count", t_47, true);
if(frame.topLevel) {
context.setVariable("declined_count", t_47);
}
if(frame.topLevel) {
context.addExport("declined_count", t_47);
}
output += "\n                                        ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "declined_count"), env.opts.autoescape);
output += "\n                                    </div>\n                                    <small>退步学生数</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"p-3 bg-secondary text-white rounded\">\n                                    <div class=\"h4 mb-0\">\n                                        ";
var t_48;
t_48 = env.getFilter("length").call(context, env.getFilter("list").call(context, env.getFilter("selectattr").call(context, runtime.contextOrFrameLookup(context, frame, "progress_ranking"),"rank_change","eq",0)));
frame.set("unchanged_count", t_48, true);
if(frame.topLevel) {
context.setVariable("unchanged_count", t_48);
}
if(frame.topLevel) {
context.addExport("unchanged_count", t_48);
}
output += "\n                                        ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "unchanged_count"), env.opts.autoescape);
output += "\n                                    </div>\n                                    <small>排名不变</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"p-3 bg-primary text-white rounded\">\n                                    <div class=\"h4 mb-0\">\n                                        ";
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "progress_ranking")) > 0) {
output += "\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "progress_ranking")),0)),"rank_change"), env.opts.autoescape);
output += "\n                                        ";
;
}
else {
output += "\n                                        0\n                                        ";
;
}
output += "\n                                    </div>\n                                    <small>最大进步名次</small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- 进步榜排名表格 -->\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-header d-flex justify-content-between align-items-center\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-graph-up-arrow text-success\"></i> 学生进步排名\n                        </h5>\n                        <span class=\"badge bg-info\">\n                            A区间: ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "progress_a_start"), env.opts.autoescape);
output += " ~ ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "progress_a_end"), env.opts.autoescape);
output += " |\n                            B区间: ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "progress_b_start"), env.opts.autoescape);
output += " ~ ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "progress_b_end"), env.opts.autoescape);
output += "\n                        </span>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-hover\">\n                                <thead class=\"table-light\">\n                                    <tr>\n                                        <th width=\"80\">进步排名</th>\n                                        <th>学生信息</th>\n                                        <th>班级</th>\n                                        <th width=\"100\">小组</th>\n                                        <th width=\"100\">A区间排名</th>\n                                        <th width=\"100\">B区间排名</th>\n                                        <th width=\"120\">排名变化</th>\n                                        <th width=\"100\">A区间积分</th>\n                                        <th width=\"100\">B区间积分</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    ";
frame = frame.push();
var t_51 = runtime.contextOrFrameLookup(context, frame, "progress_ranking");
if(t_51) {t_51 = runtime.fromIterator(t_51);
var t_50 = t_51.length;
for(var t_49=0; t_49 < t_51.length; t_49++) {
var t_52 = t_51[t_49];
frame.set("item", t_52);
frame.set("loop.index", t_49 + 1);
frame.set("loop.index0", t_49);
frame.set("loop.revindex", t_50 - t_49);
frame.set("loop.revindex0", t_50 - t_49 - 1);
frame.set("loop.first", t_49 === 0);
frame.set("loop.last", t_49 === t_50 - 1);
frame.set("loop.length", t_50);
output += "\n                                    <tr\n                                        class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") <= 3 && runtime.memberLookup((t_52),"rank_change") > 0) {
output += "table-success";
;
}
else {
if(runtime.memberLookup((t_52),"rank_change") < 0) {
output += "table-danger";
;
}
;
}
output += "\">\n                                        <td>\n                                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 1 && runtime.memberLookup((t_52),"rank_change") > 0) {
output += "\n                                            <i class=\"bi bi-award-fill text-warning fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 2 && runtime.memberLookup((t_52),"rank_change") > 0) {
output += "\n                                            <i class=\"bi bi-award-fill text-secondary fs-4\"></i>\n                                            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == 3 && runtime.memberLookup((t_52),"rank_change") > 0) {
output += "\n                                            <i class=\"bi bi-award-fill\" style=\"color: #CD7F32;\" class=\"fs-4\"></i>\n                                            ";
;
}
else {
output += "\n                                            <span class=\"badge bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "</span>\n                                            ";
;
}
;
}
;
}
output += "\n                                        </td>\n                                        <td>\n                                            <div class=\"d-flex align-items-center\">\n                                                <img src=\"";
output += runtime.suppressValue((lineno = 889, colno = 71, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "avatar_url"), "avatar_url", context, [runtime.memberLookup((runtime.memberLookup((t_52),"student")),"id")])), env.opts.autoescape);
output += "\"\n                                                    alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_52),"student")),"name"), env.opts.autoescape);
output += "\" class=\"avatar me-2\">\n                                                <div>\n                                                    <a href=\"";
output += runtime.suppressValue((lineno = 892, colno = 71, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["student_trend",runtime.makeKeywordArgs({"id": runtime.memberLookup((runtime.memberLookup((t_52),"student")),"id")})])), env.opts.autoescape);
output += "\"\n                                                        class=\"text-decoration-none\">\n                                                        <strong>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_52),"student")),"name"), env.opts.autoescape);
output += "</strong>\n                                                    </a>\n                                                    <br>\n                                                </div>\n                                            </div>\n                                        </td>\n                                        <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_52),"student")),"class_name"), env.opts.autoescape);
output += "</td>\n                                        <td>\n                                            ";
if(runtime.memberLookup((runtime.memberLookup((t_52),"student")),"group")) {
output += "\n                                            <span class=\"badge\"\n                                                style=\"background-color: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_52),"student")),"group")),"color"), env.opts.autoescape);
output += ";\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_52),"student")),"group")),"name"), env.opts.autoescape);
output += "\n                                            </span>\n                                            ";
;
}
else {
output += "\n                                            <span class=\"text-muted\">无</span>\n                                            ";
;
}
output += "\n                                        </td>\n                                        <td>\n                                            <span class=\"badge bg-secondary\">第";
output += runtime.suppressValue(runtime.memberLookup((t_52),"rank_a"), env.opts.autoescape);
output += "名</span>\n                                        </td>\n                                        <td>\n                                            <span class=\"badge bg-primary\">第";
output += runtime.suppressValue(runtime.memberLookup((t_52),"rank_b"), env.opts.autoescape);
output += "名</span>\n                                        </td>\n                                        <td>\n                                            ";
if(runtime.memberLookup((t_52),"rank_change") > 0) {
output += "\n                                            <span class=\"badge bg-success fs-6\">\n                                                <i class=\"bi bi-arrow-up\"></i> +";
output += runtime.suppressValue(runtime.memberLookup((t_52),"rank_change"), env.opts.autoescape);
output += "\n                                            </span>\n                                            ";
;
}
else {
if(runtime.memberLookup((t_52),"rank_change") < 0) {
output += " <span class=\"badge bg-danger fs-6\">\n                                                <i class=\"bi bi-arrow-down\"></i> ";
output += runtime.suppressValue(runtime.memberLookup((t_52),"rank_change"), env.opts.autoescape);
output += "\n                                                </span>\n                                                ";
;
}
else {
output += "\n                                                <span class=\"badge bg-secondary fs-6\">\n                                                    <i class=\"bi bi-dash\"></i> 0\n                                                </span>\n                                                ";
;
}
;
}
output += "\n                                        </td>\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_52),"points_a") >= 0) {
output += "bg-outline-secondary";
;
}
else {
output += "bg-warning";
;
}
output += "\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_52),"points_a"), env.opts.autoescape);
output += "分\n                                            </span>\n                                        </td>\n                                        <td>\n                                            <span\n                                                class=\"badge ";
if(runtime.memberLookup((t_52),"points_b") >= 0) {
output += "bg-info";
;
}
else {
output += "bg-warning";
;
}
output += "\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_52),"points_b"), env.opts.autoescape);
output += "分\n                                            </span>\n                                        </td>\n                                    </tr>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "progress_a_start") && runtime.contextOrFrameLookup(context, frame, "progress_a_end") && runtime.contextOrFrameLookup(context, frame, "progress_b_start") && runtime.contextOrFrameLookup(context, frame, "progress_b_end")) {
output += "\n        <div class=\"text-center py-5\">\n            <i class=\"bi bi-emoji-frown text-muted\" style=\"font-size: 3rem;\"></i>\n            <p class=\"text-muted\">暂无进步数据</p>\n        </div>\n        ";
;
}
else {
output += "\n        <div class=\"text-center py-5\">\n            <i class=\"bi bi-calendar-range text-muted\" style=\"font-size: 3rem;\"></i>\n            <p class=\"text-muted\">请选择A区间和B区间的时间范围来计算进步榜</p>\n        </div>\n        ";
;
}
;
}
output += "\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 967;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script>\n    function refreshData() {\n        location.reload();\n    }\n\n    // 格式化日期为 YYYY-MM-DD\n    function formatDate(date) {\n        const year = date.getFullYear();\n        const month = String(date.getMonth() + 1).padStart(2, '0');\n        const day = String(date.getDate()).padStart(2, '0');\n        return `${year}-${month}-${day}`;\n    }\n\n    // 获取头像URL\n    function avatarUrl(studentId) {\n        return `/api/avatar/${studentId}`;\n    }\n\n    // 渲染进步榜统计摘要\n    function renderProgressStats(stats, progressAStart, progressAEnd, progressBStart, progressBEnd) {\n        return `\n        <div class=\"row mb-4\">\n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-header\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-bar-chart-fill\"></i> 进步榜统计\n                        </h5>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"row text-center\">\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"p-3 bg-success text-white rounded\">\n                                    <div class=\"h4 mb-0\">${stats.improved_count}</div>\n                                    <small>进步学生数</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"p-3 bg-danger text-white rounded\">\n                                    <div class=\"h4 mb-0\">${stats.declined_count}</div>\n                                    <small>退步学生数</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"p-3 bg-secondary text-white rounded\">\n                                    <div class=\"h4 mb-0\">${stats.unchanged_count}</div>\n                                    <small>排名不变</small>\n                                </div>\n                            </div>\n                            <div class=\"col-md-3 mb-3\">\n                                <div class=\"p-3 bg-primary text-white rounded\">\n                                    <div class=\"h4 mb-0\">${stats.max_improvement}</div>\n                                    <small>最大进步名次</small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    `;\n    }\n\n    // 渲染进步榜排名表格\n    function renderProgressTable(progressRanking, progressAStart, progressAEnd, progressBStart, progressBEnd) {\n        if (!progressRanking || progressRanking.length === 0) {\n            return `\n            <div class=\"text-center py-5\">\n                <i class=\"bi bi-emoji-frown text-muted\" style=\"font-size: 3rem;\"></i>\n                <p class=\"text-muted\">暂无进步数据</p>\n            </div>\n        `;\n        }\n\n        let rowsHtml = '';\n        progressRanking.forEach((item, index) => {\n            let rowClass = '';\n            if (index < 3 && item.rank_change > 0) rowClass = 'table-success';\n            else if (item.rank_change < 0) rowClass = 'table-danger';\n\n            let rankBadge = '';\n            if (index === 0 && item.rank_change > 0) {\n                rankBadge = '<i class=\"bi bi-award-fill text-warning fs-4\"></i>';\n            } else if (index === 1 && item.rank_change > 0) {\n                rankBadge = '<i class=\"bi bi-award-fill text-secondary fs-4\"></i>';\n            } else if (index === 2 && item.rank_change > 0) {\n                rankBadge = '<i class=\"bi bi-award-fill fs-4\" style=\"color: #CD7F32;\"></i>';\n            } else {\n                rankBadge = `<span class=\"badge bg-secondary\">${index + 1}</span>`;\n            }\n\n            let changeBadge = '';\n            if (item.rank_change > 0) {\n                changeBadge = `<span class=\"badge bg-success fs-6\"><i class=\"bi bi-arrow-up\"></i> +${item.rank_change}</span>`;\n            } else if (item.rank_change < 0) {\n                changeBadge = `<span class=\"badge bg-danger fs-6\"><i class=\"bi bi-arrow-down\"></i> ${item.rank_change}</span>`;\n            } else {\n                changeBadge = `<span class=\"badge bg-secondary fs-6\"><i class=\"bi bi-dash\"></i> 0</span>`;\n            }\n\n            const groupBadge = item.student.group\n                ? `<span class=\"badge\" style=\"background-color: ${item.student.group.color};\">${item.student.group.name}</span>`\n                : '<span class=\"text-muted\">无</span>';\n\n            rowsHtml += `\n            <tr class=\"${rowClass}\">\n                <td>${rankBadge}</td>\n                <td>\n                    <div class=\"d-flex align-items-center\">\n                        <img src=\"${avatar_url(item.student.id)}\" alt=\"${item.student.name}\" class=\"avatar me-2\">\n                        <div>\n                            <a href=\"/trend/${item.student.id}\" class=\"text-decoration-none\">\n                                <strong>${item.student.name}</strong>\n                            </a>\n                            <br>\n                        </div>\n                    </div>\n                </td>\n                <td>${item.student.class_name}</td>\n                <td>${groupBadge}</td>\n                <td><span class=\"badge bg-secondary\">第${item.rank_a}名</span></td>\n                <td><span class=\"badge bg-primary\">第${item.rank_b}名</span></td>\n                <td>${changeBadge}</td>\n                <td><span class=\"badge bg-outline-secondary\">${item.points_a}分</span></td>\n                <td><span class=\"badge bg-info\">${item.points_b}分</span></td>\n            </tr>\n        `;\n        });\n\n        return `\n        <div class=\"row\">\n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-header d-flex justify-content-between align-items-center\">\n                        <h5 class=\"mb-0\">\n                            <i class=\"bi bi-graph-up-arrow text-success\"></i> 学生进步排名\n                        </h5>\n                        <span class=\"badge bg-info\">\n                            A区间: ${progressAStart} ~ ${progressAEnd} |\n                            B区间: ${progressBStart} ~ ${progressBEnd}\n                        </span>\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-hover\">\n                                <thead class=\"table-light\">\n                                    <tr>\n                                        <th width=\"80\">进步排名</th>\n                                        <th>学生信息</th>\n                                        <th>班级</th>\n                                        <th width=\"100\">小组</th>\n                                        <th width=\"100\">A区间排名</th>\n                                        <th width=\"100\">B区间排名</th>\n                                        <th width=\"120\">排名变化</th>\n                                        <th width=\"100\">A区间积分</th>\n                                        <th width=\"100\">B区间积分</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    ${rowsHtml}\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    `;\n    }\n\n    // 加载进步榜数据\n    async function loadProgressRanking() {\n        const progressAStart = document.getElementById('progress_a_start').value;\n        const progressAEnd = document.getElementById('progress_a_end').value;\n        const progressBStart = document.getElementById('progress_b_start').value;\n        const progressBEnd = document.getElementById('progress_b_end').value;\n        const progressResults = document.getElementById('progressResults');\n        const submitBtn = document.getElementById('progressSubmitBtn');\n\n        // 如果没有填写完整日期，不显示结果\n        if (!progressAStart || !progressAEnd || !progressBStart || !progressBEnd) {\n            progressResults.innerHTML = `\n            <div class=\"text-center py-5\">\n                <i class=\"bi bi-calendar-range text-muted\" style=\"font-size: 3rem;\"></i>\n                <p class=\"text-muted\">请选择A区间和B区间的时间范围来计算进步榜</p>\n            </div>\n        `;\n            return;\n        }\n\n        // 显示加载状态\n        submitBtn.disabled = true;\n        submitBtn.innerHTML = '<span class=\"spinner-border spinner-border-sm\"></span> 加载中...';\n        progressResults.innerHTML = '';\n\n        try {\n            const params = new URLSearchParams({\n                progress_a_start: progressAStart,\n                progress_a_end: progressAEnd,\n                progress_b_start: progressBStart,\n                progress_b_end: progressBEnd\n            });\n\n            const response = await fetch(`/api/progress-ranking?${params.toString()}`);\n\n            if (!response.ok) {\n                throw new Error('请求失败');\n            }\n\n            const data = await response.json();\n\n            // 渲染结果\n            progressResults.innerHTML = renderProgressStats(data.stats, data.progress_a_start, data.progress_a_end, data.progress_b_start, data.progress_b_end) +\n                renderProgressTable(data.progress_ranking, data.progress_a_start, data.progress_a_end, data.progress_b_start, data.progress_b_end);\n\n            // 如果有结果，自动切换到进步榜标签页\n            if (data.progress_ranking && data.progress_ranking.length > 0) {\n                const progressTab = document.getElementById('progress-tab');\n                const progressPane = document.getElementById('progress');\n                const tab = new bootstrap.Tab(progressTab);\n                tab.show();\n            }\n        } catch (error) {\n            console.error('加载进步榜数据失败:', error);\n            progressResults.innerHTML = `\n            <div class=\"alert alert-danger\">\n                <i class=\"bi bi-exclamation-triangle\"></i> 加载失败，请重试\n            </div>\n        `;\n        } finally {\n            submitBtn.disabled = false;\n            submitBtn.innerHTML = '<i class=\"bi bi-search\"></i> 计算进步榜';\n        }\n    }\n\n    document.addEventListener('DOMContentLoaded', function () {\n        // 设置默认日期为最近一个月\n        const today = new Date();\n        const oneMonthAgo = new Date();\n        oneMonthAgo.setMonth(today.getMonth() - 1);\n\n        // 如果没有选择日期，设置默认日期\n        if (!document.getElementById('start_date').value) {\n            document.getElementById('start_date').value = formatDate(oneMonthAgo);\n        }\n        if (!document.getElementById('end_date').value) {\n            document.getElementById('end_date').value = formatDate(today);\n        }\n\n        // 进步榜表单提交处理（AJAX）\n        const progressForm = document.getElementById('progressForm');\n        if (progressForm) {\n            progressForm.addEventListener('submit', function (e) {\n                e.preventDefault();\n                loadProgressRanking();\n            });\n\n            // 日期变化时自动加载\n            const progressDateInputs = progressForm.querySelectorAll('input[type=\"date\"]');\n            progressDateInputs.forEach(input => {\n                input.addEventListener('change', function () {\n                    // 检查是否所有日期都已填写\n                    const aStart = document.getElementById('progress_a_start').value;\n                    const aEnd = document.getElementById('progress_a_end').value;\n                    const bStart = document.getElementById('progress_b_start').value;\n                    const bEnd = document.getElementById('progress_b_end').value;\n\n                    if (aStart && aEnd && bStart && bEnd) {\n                        loadProgressRanking();\n                    }\n                });\n            });\n\n            // 页面加载时如果有已保存的日期，自动加载\n            const aStart = document.getElementById('progress_a_start').value;\n            const aEnd = document.getElementById('progress_a_end').value;\n            const bStart = document.getElementById('progress_b_start').value;\n            const bEnd = document.getElementById('progress_b_end').value;\n\n            if (aStart && aEnd && bStart && bEnd) {\n                loadProgressRanking();\n            }\n        }\n\n        // 添加动画效果\n        const tabs = document.querySelectorAll('#rankingTabs button');\n        tabs.forEach(tab => {\n            tab.addEventListener('shown.bs.tab', function () {\n                const target = document.querySelector(this.dataset.bsTarget);\n                target.classList.add('fade-in');\n            });\n        });\n    });\n</script>\n\n<style>\n    .fade-in {\n        animation: fadeIn 0.5s ease-in;\n    }\n\n    @keyframes fadeIn {\n        from {\n            opacity: 0;\n            transform: translateY(10px);\n        }\n\n        to {\n            opacity: 1;\n            transform: translateY(0);\n        }\n    }\n\n    .group-ranking-card {\n        transition: transform 0.2s ease;\n    }\n\n    .group-ranking-card:hover {\n        transform: translateY(-5px);\n    }\n</style>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};
})();
precompiledTemplates["student_trend.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "student_trend.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <div class=\"d-flex justify-content-between align-items-center\">\n            <div>\n                <h1 class=\"h2\">\n                    <i class=\"bi bi-graph-up\"></i> 积分趋势分析\n                </h1>\n                <nav aria-label=\"breadcrumb\">\n                    <ol class=\"breadcrumb\">\n                        <li class=\"breadcrumb-item\"><a href=\"";
output += runtime.suppressValue((lineno = 12, colno = 71, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["rankings"])), env.opts.autoescape);
output += "\">排名统计</a></li>\n                        <li class=\"breadcrumb-item active\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"name"), env.opts.autoescape);
output += " - 趋势分析</li>\n                    </ol>\n                </nav>\n            </div>\n            <div>\n                <a href=\"";
output += runtime.suppressValue((lineno = 18, colno = 35, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["rankings"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-secondary\">\n                    <i class=\"bi bi-arrow-left\"></i> 返回排名\n                </a>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- 学生基本信息 -->\n<div class=\"row mb-4\">\n    <div class=\"col-md-3\">\n        <div class=\"card text-center\">\n            <div class=\"card-body\">\n                <img src=\"";
output += runtime.suppressValue((lineno = 31, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "avatar_url"), "avatar_url", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"id")])), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"name"), env.opts.autoescape);
output += "\" class=\"avatar mx-auto mb-3\" style=\"width: 80px; height: 80px;\">\n                <h5>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"name"), env.opts.autoescape);
output += "</h5>\n                <p class=\"text-muted mb-0\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"student_id"), env.opts.autoescape);
output += "</p>\n                <p class=\"text-muted\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"class_name"), env.opts.autoescape);
output += "</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-9\">\n        <div class=\"card\">\n            <div class=\"card-body\">\n                <div class=\"row text-center\">\n                    <div class=\"col-md-3\">\n                        <div class=\"p-3\">\n                            <div class=\"h3 mb-1 ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"total_points") >= 0) {
output += "text-success";
;
}
else {
output += "text-danger";
;
}
output += "\">\n                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"total_points"), env.opts.autoescape);
output += "\n                            </div>\n                            <small class=\"text-muted\">总积分</small>\n                        </div>\n                    </div>\n                    <div class=\"col-md-3\">\n                        <div class=\"p-3\">\n                            <div class=\"h3 mb-1 text-primary\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"rank"), env.opts.autoescape);
output += "</div>\n                            <small class=\"text-muted\">班级排名</small>\n                        </div>\n                    </div>\n                    <div class=\"col-md-3\">\n                        <div class=\"p-3\">\n                            <div class=\"h3 mb-1 text-info\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"records_count"), env.opts.autoescape);
output += "</div>\n                            <small class=\"text-muted\">记录数</small>\n                        </div>\n                    </div>\n                    <div class=\"col-md-3\">\n                        <div class=\"p-3\">\n                            <div class=\"h3 mb-1 text-warning\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"avg_points")), env.opts.autoescape);
output += "</div>\n                            <small class=\"text-muted\">平均每次</small>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- 趋势图表 -->\n<div class=\"card mb-4\">\n    <div class=\"card-header\">\n        <h5 class=\"mb-0\">\n            <i class=\"bi bi-graph-up-arrow\"></i> 累计积分趋势\n        </h5>\n    </div>\n    <div class=\"card-body\">\n        <canvas id=\"trendChart\" height=\"80\"></canvas>\n    </div>\n</div>\n\n<!-- 统计对比 -->\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <div class=\"card\">\n            <div class=\"card-header\">\n                <h6 class=\"mb-0\">\n                    <i class=\"bi bi-bar-chart\"></i> 班级统计对比\n                </h6>\n            </div>\n            <div class=\"card-body\">\n                <div class=\"mb-3\">\n                    <div class=\"d-flex justify-content-between mb-1\">\n                        <span>个人积分</span>\n                        <strong class=\"";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"total_points") >= 0) {
output += "text-success";
;
}
else {
output += "text-danger";
;
}
output += "\">\n                            ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"total_points"), env.opts.autoescape);
output += "\n                        </strong>\n                    </div>\n                    <div class=\"progress\" style=\"height: 25px;\">\n                        <div class=\"progress-bar ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "student")),"total_points") >= 0) {
output += "bg-success";
;
}
else {
output += "bg-danger";
;
}
output += "\"\n                             style=\"width: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"percentile"), env.opts.autoescape);
output += "%\">\n                            ";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.0f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"percentile")), env.opts.autoescape);
output += "%\n                        </div>\n                    </div>\n                </div>\n                <hr>\n                <div class=\"row text-center\">\n                    <div class=\"col-4\">\n                        <div class=\"text-muted small\">班级平均</div>\n                        <div class=\"h5 mb-0\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "class_stats")),"avg")), env.opts.autoescape);
output += "</div>\n                    </div>\n                    <div class=\"col-4\">\n                        <div class=\"text-muted small\">中位数</div>\n                        <div class=\"h5 mb-0\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.1f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "class_stats")),"median")), env.opts.autoescape);
output += "</div>\n                    </div>\n                    <div class=\"col-4\">\n                        <div class=\"text-muted small\">最高分</div>\n                        <div class=\"h5 mb-0\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "class_stats")),"max"), env.opts.autoescape);
output += "</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- 最近记录 -->\n<div class=\"card\">\n    <div class=\"card-header\">\n        <h5 class=\"mb-0\">\n            <i class=\"bi bi-clock-history\"></i> 最近积分记录\n        </h5>\n    </div>\n    <div class=\"card-body\">\n        ";
if(runtime.contextOrFrameLookup(context, frame, "recent_records")) {
output += "\n        <div class=\"table-responsive\">\n            <table class=\"table table-hover\">\n                <thead class=\"table-light\">\n                    <tr>\n                        <th width=\"100\">积分</th>\n                        <th>事由</th>\n                        <th>类别</th>\n                        <th>操作人</th>\n                        <th width=\"150\">时间</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "recent_records");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("record", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                    <tr>\n                        <td>\n                            <span class=\"badge ";
if(runtime.memberLookup((t_11),"points") > 0) {
output += "bg-success";
;
}
else {
output += "bg-danger";
;
}
output += " fs-6\">\n                                ";
if(runtime.memberLookup((t_11),"points") > 0) {
output += "+";
;
}
output += runtime.suppressValue(runtime.memberLookup((t_11),"points"), env.opts.autoescape);
output += "\n                            </span>\n                        </td>\n                        <td>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"reason") || "无", env.opts.autoescape);
output += "</td>\n                        <td><span class=\"badge bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"category"), env.opts.autoescape);
output += "</span></td>\n                        <td>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"operator") || "系统", env.opts.autoescape);
output += "</td>\n                        <td>";
output += runtime.suppressValue((lineno = 161, colno = 57, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_11),"created_at")),"strftime"), "record[\"created_at\"][\"strftime\"]", context, ["%Y-%m-%d %H:%M"])), env.opts.autoescape);
output += "</td>\n                    </tr>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                </tbody>\n            </table>\n        </div>\n        ";
;
}
else {
output += "\n        <div class=\"text-center py-4\">\n            <i class=\"bi bi-inbox text-muted\" style=\"font-size: 3rem;\"></i>\n            <p class=\"text-muted mt-2\">暂无积分记录</p>\n        </div>\n        ";
;
}
output += "\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 177;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script src=\"https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js\"></script>\n<script>\n// 趋势图数据\nconst trendData = ";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.contextOrFrameLookup(context, frame, "trend_data")), env.opts.autoescape);
output += ";\nconst classAvgData = ";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.contextOrFrameLookup(context, frame, "class_avg_data")), env.opts.autoescape);
output += ";\nconst classQ1Data = ";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.contextOrFrameLookup(context, frame, "class_q1_data")), env.opts.autoescape);
output += ";\nconst classQ3Data = ";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.contextOrFrameLookup(context, frame, "class_q3_data")), env.opts.autoescape);
output += ";\nconst classMedianData = ";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.contextOrFrameLookup(context, frame, "class_median_data")), env.opts.autoescape);
output += ";\n\n// 累计积分趋势图\nconst trendCtx = document.getElementById('trendChart').getContext('2d');\nnew Chart(trendCtx, {\n    type: 'line',\n    data: {\n        labels: trendData.map(d => d.date),\n        datasets: [\n            {\n                label: '个人累计积分',\n                data: trendData.map(d => d.cumulative),\n                borderColor: 'rgb(75, 192, 192)',\n                backgroundColor: 'rgba(75, 192, 192, 0.1)',\n                tension: 0.4,\n                fill: true,\n                borderWidth: 3\n            },\n            {\n                label: '班级平均分',\n                data: classAvgData.map(d => d.avg),\n                borderColor: 'rgb(255, 159, 64)',\n                backgroundColor: 'transparent',\n                tension: 0.4,\n                borderWidth: 2,\n                borderDash: [5, 5]\n            },\n            {\n                label: '上四分位数',\n                data: classQ3Data.map(d => d.q3),\n                borderColor: 'rgb(153, 102, 255)',\n                backgroundColor: 'transparent',\n                tension: 0.4,\n                borderWidth: 1,\n                borderDash: [3, 3]\n            },\n            {\n                label: '中位数',\n                data: classMedianData.map(d => d.median),\n                borderColor: 'rgb(54, 162, 235)',\n                backgroundColor: 'transparent',\n                tension: 0.4,\n                borderWidth: 2,\n                borderDash: [5, 5]\n            },\n            {\n                label: '下四分位数',\n                data: classQ1Data.map(d => d.q1),\n                borderColor: 'rgb(255, 99, 132)',\n                backgroundColor: 'transparent',\n                tension: 0.4,\n                borderWidth: 1,\n                borderDash: [3, 3]\n            }\n        ]\n    },\n    options: {\n        responsive: true,\n        maintainAspectRatio: true,\n        interaction: {\n            mode: 'index',\n            intersect: false\n        },\n        plugins: {\n            legend: {\n                position: 'top',\n            },\n            tooltip: {\n                callbacks: {\n                    label: function(context) {\n                        return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '分';\n                    }\n                }\n            }\n        },\n        scales: {\n            y: {\n                beginAtZero: false,\n                title: {\n                    display: true,\n                    text: '积分'\n                }\n            },\n            x: {\n                title: {\n                    display: true,\n                    text: '日期'\n                }\n            }\n        }\n    }\n});\n\n\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};
})();
precompiledTemplates["students.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "students.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row mb-4\">\n    <div class=\"col-12\">\n        <div class=\"d-flex justify-content-between align-items-center\">\n            <h1 class=\"h2\">学生管理</h1>\n            <a href=\"";
output += runtime.suppressValue((lineno = 7, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_student"])), env.opts.autoescape);
output += "\" class=\"btn btn-primary\">\n                <i class=\"bi bi-plus-circle\"></i> 添加学生\n            </a>\n        </div>\n    </div>\n</div>\n\n<div class=\"row mb-3\">\n    <div class=\"col-md-6\">\n        <form method=\"GET\" class=\"d-flex\">\n            <input type=\"text\" name=\"search\" class=\"form-control me-2\" placeholder=\"搜索学生姓名或班级...\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "search"), env.opts.autoescape);
output += "\">\n            <button type=\"submit\" class=\"btn btn-outline-primary\">\n                <i class=\"bi bi-search\"></i>\n            </button>\n        </form>\n    </div>\n    <div class=\"col-md-6 text-end\">\n        <span class=\"text-muted\">\n            共找到 ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"total"), env.opts.autoescape);
output += " 名学生\n        </span>\n    </div>\n</div>\n\n";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"items")) {
output += "\n<div class=\"card\">\n    <div class=\"card-body p-0\">\n        <div class=\"table-responsive\">\n            <table class=\"table table-hover mb-0\">\n                <thead class=\"table-light\">\n                    <tr>\n                        <th>姓名</th>\n                        <th>班级</th>\n                        <th>总积分</th>\n                        <th>记录数</th>\n                        <th>创建时间</th>\n                        <th>操作</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ";
frame = frame.push();
var t_10 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"items");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("student", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                    <tr>\n                        <td>\n                            <div class=\"d-flex align-items-center\">\n                                <img src=\"";
output += runtime.suppressValue((lineno = 50, colno = 55, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "avatar_url"), "avatar_url", context, [runtime.memberLookup((t_11),"id")])), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "\" class=\"avatar me-2\">\n                                <a href=\"";
output += runtime.suppressValue((lineno = 51, colno = 51, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["student_trend",runtime.makeKeywordArgs({"id": runtime.memberLookup((t_11),"id")})])), env.opts.autoescape);
output += "\"\n                                    class=\"text-decoration-none fw-bold\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "\n                                </a>\n                            </div>\n                        </td>\n                        <td>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"class_name"), env.opts.autoescape);
output += "</td>\n                        <td>\n                            ";
var t_12;
t_12 = (lineno = 59, colno = 63, runtime.callWrap(runtime.memberLookup((t_11),"total_points"), "student[\"total_points\"]", context, []));
frame.set("total", t_12, true);
if(frame.topLevel) {
context.setVariable("total", t_12);
}
if(frame.topLevel) {
context.addExport("total", t_12);
}
output += "\n                            ";
if(runtime.contextOrFrameLookup(context, frame, "total") >= 0) {
output += "\n                            <span class=\"points-positive\">+";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "total"), env.opts.autoescape);
output += "</span>\n                            ";
;
}
else {
output += "\n                            <span class=\"points-negative\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "total"), env.opts.autoescape);
output += "</span>\n                            ";
;
}
output += "\n                        </td>\n                        <td>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"records_count"), env.opts.autoescape);
output += "</td>\n                        <td>";
output += runtime.suppressValue((lineno = 67, colno = 58, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_11),"created_at")),"strftime"), "student[\"created_at\"][\"strftime\"]", context, ["%Y-%m-%d"])), env.opts.autoescape);
output += "</td>\n                        <td>\n                            <div class=\"btn-group btn-group-sm\">\n                                <a href=\"";
output += runtime.suppressValue((lineno = 70, colno = 51, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["student_trend",runtime.makeKeywordArgs({"id": runtime.memberLookup((t_11),"id")})])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-primary\"\n                                    title=\"查看趋势分析\">\n                                    <i class=\"bi bi-graph-up\"></i>\n                                </a>\n                                <button class=\"btn btn-outline-success\"\n                                    onclick=\"quickAddPoints(";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += ", ";
output += runtime.suppressValue(env.getFilter("dump").call(context, runtime.memberLookup((t_11),"name")), env.opts.autoescape);
output += ")\">\n                                    <i class=\"bi bi-plus\"></i>\n                                </button>\n                            </div>\n                        </td>\n                    </tr>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n\n<!-- 分页 -->\n";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"pages") > 1) {
output += "\n<nav class=\"mt-4\">\n    <ul class=\"pagination justify-content-center\">\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"has_prev")) {
output += "\n        <li class=\"page-item\">\n            <a class=\"page-link\" href=\"";
output += runtime.suppressValue((lineno = 94, colno = 49, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["students",runtime.makeKeywordArgs({"page": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"prev_num"),"search": runtime.contextOrFrameLookup(context, frame, "search")})])), env.opts.autoescape);
output += "\">上一页</a>\n        </li>\n        ";
;
}
output += "\n\n        ";
frame = frame.push();
var t_15 = (lineno = 98, colno = 46, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"iter_pages"), "students[\"iter_pages\"]", context, []));
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("page_num", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
output += "\n        ";
if(t_16) {
output += "\n        ";
if(t_16 != runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"page")) {
output += "\n        <li class=\"page-item\">\n            <a class=\"page-link\" href=\"";
output += runtime.suppressValue((lineno = 102, colno = 49, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["students",runtime.makeKeywordArgs({"page": t_16,"search": runtime.contextOrFrameLookup(context, frame, "search")})])), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(t_16, env.opts.autoescape);
output += "</a>\n        </li>\n        ";
;
}
else {
output += "\n        <li class=\"page-item active\">\n            <span class=\"page-link\">";
output += runtime.suppressValue(t_16, env.opts.autoescape);
output += "</span>\n        </li>\n        ";
;
}
output += "\n        ";
;
}
else {
output += "\n        <li class=\"page-item disabled\">\n            <span class=\"page-link\">...</span>\n        </li>\n        ";
;
}
output += "\n        ";
;
}
}
frame = frame.pop();
output += "\n\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"has_next")) {
output += "\n        <li class=\"page-item\">\n            <a class=\"page-link\" href=\"";
output += runtime.suppressValue((lineno = 118, colno = 49, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["students",runtime.makeKeywordArgs({"page": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "students")),"next_num"),"search": runtime.contextOrFrameLookup(context, frame, "search")})])), env.opts.autoescape);
output += "\">下一页</a>\n        </li>\n        ";
;
}
output += "\n    </ul>\n</nav>\n";
;
}
output += "\n";
;
}
else {
output += "\n<div class=\"card\">\n    <div class=\"card-body text-center py-5\">\n        <i class=\"bi bi-person-x fs-1 text-muted\"></i>\n        <h5 class=\"mt-3 text-muted\">暂无学生数据</h5>\n        <p class=\"text-muted\">开始添加学生来使用系统</p>\n        <a href=\"";
output += runtime.suppressValue((lineno = 130, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_student"])), env.opts.autoescape);
output += "\" class=\"btn btn-primary\">\n            <i class=\"bi bi-person-plus-fill\"></i> 添加第一个学生\n        </a>\n    </div>\n</div>\n";
;
}
output += "\n\n<!-- 快速添加积分模态框 -->\n<div class=\"modal fade\" id=\"quickAddModal\" tabindex=\"-1\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">快速添加积分</h5>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n            </div>\n            <form method=\"POST\" action=\"";
output += runtime.suppressValue((lineno = 145, colno = 50, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["add_points"])), env.opts.autoescape);
output += "\">\n                <div class=\"modal-body\">\n                    <input type=\"hidden\" id=\"quickStudentId\" name=\"student_id\">\n\n                    <div class=\"mb-3\">\n                        <label class=\"form-label\">学生</label>\n                        <input type=\"text\" class=\"form-control\" id=\"quickStudentName\" readonly>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label class=\"form-label\">积分值</label>\n                        <input type=\"number\" name=\"points\" class=\"form-control\" required placeholder=\"正数为加分，负数为扣分\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label class=\"form-label\">事由</label>\n                        <input type=\"text\" name=\"reason\" class=\"form-control\" placeholder=\"选填，如不填写将使用类别作为默认事由\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label class=\"form-label\">类别</label>\n                        <select name=\"category\" class=\"form-select\" required>\n                            <option value=\"\">请选择类别</option>\n                            ";
frame = frame.push();
var t_19 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("category", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "\n                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_20),"name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_20),"name"), env.opts.autoescape);
output += "</option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label class=\"form-label\">操作人</label>\n                        <input type=\"text\" name=\"operator\" class=\"form-control\" placeholder=\"选填，请输入操作人姓名\">\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">取消</button>\n                    <button type=\"submit\" class=\"btn btn-primary\">添加</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 189;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script>\n    function quickAddPoints(studentId, studentName) {\n        document.getElementById('quickStudentId').value = studentId;\n        document.getElementById('quickStudentName').value = studentName;\n        new bootstrap.Modal(document.getElementById('quickAddModal')).show();\n    }\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};
})();
