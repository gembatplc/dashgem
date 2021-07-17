/*
 Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){function p(c){var a=c.widgets,b=c.focusManager.currentActive;if(c.focusManager.hasFocus){if(a.focused)return a.focused;if(b instanceof CKEDITOR.plugins.widget.nestedEditable)return a.getByElement(b)}}function l(c,a){return c.features&&-1!==CKEDITOR.tools.array.indexOf(c.features,a)}function t(c,a){return CKEDITOR.tools.array.reduce(CKEDITOR.tools.object.keys(c),function(b,d){var f=c[d];l(f,a)&&b.push(f);return b},[])}function u(c,a){a=CKEDITOR.tools.object.merge({pathName:c.lang.imagebase.pathName,
defaults:{imageClass:c.config.easyimage_class||"",alt:"",src:"",caption:""},template:'\x3cfigure class\x3d"{imageClass}"\x3e\x3cimg alt\x3d"{alt}" src\x3d"{src}" /\x3e\x3cfigcaption\x3e{caption}\x3c/figcaption\x3e\x3c/figure\x3e',allowedContent:{img:{attributes:"!src,alt,width,height"},figure:!0,figcaption:!0},requiredContent:"figure; img[!src]",features:[],editables:{caption:{selector:"figcaption",pathName:c.lang.imagebase.pathNameCaption,allowedContent:"br em strong sub sup u s; a[!href,target]"}},
parts:{image:"img",caption:"figcaption"},upcasts:{figure:function(b){if(1===b.find("img",!0).length)return b}}},a);a.upcast=CKEDITOR.tools.object.keys(a.upcasts).join(",");return a}function m(c){this.wrapper=CKEDITOR.dom.element.createFromHtml(c||'\x3cdiv class\x3d"cke_loader"\x3e\x3c/div\x3e')}function n(){m.call(this,'\x3cdiv class\x3d"cke_loader"\x3e\x3cdiv class\x3d"cke_bar" styles\x3d"transition: width '+q/1E3+'s"\x3e\x3c/div\x3e\x3c/div\x3e');this.bar=this.wrapper.getFirst()}var r=!1,v={caption:function(){function c(b){b.parts.caption.data("cke-caption-placeholder",
!1)}function a(b,a){b.data("cke-caption-active",a);b.data("cke-caption-hidden",!a)}return{setUp:function(b){function a(d){var e=(d="blur"===d.name?b.elementPath():d.data.path)?d.lastElement:null;d=t(b.widgets.instances,"caption");if(!b.filter.check("figcaption"))return CKEDITOR.tools.array.forEach(c,function(a){a.removeListener()});CKEDITOR.tools.array.forEach(d,function(a){a._refreshCaption(e)})}var c=[];c.push(b.on("selectionChange",a,null,null,9));c.push(b.on("blur",a))},init:function(){if(this.editor.filter.check("figcaption")){if(!this.parts.caption){var a=
this.parts,d=this.element,c=d.getDocument().createElement("figcaption");d.append(c);this.initEditable("caption",this.definition.editables.caption);a.caption=c}this.editables.caption.getData()||this.parts.caption.data("cke-caption-placeholder")||this._refreshCaption()}},_refreshCaption:function(b){var d=p(this.editor)===this,f=this.parts.caption,g=this.editables.caption;if(d)g.getData()||b.equals(f)?(!b||b.equals(f)&&b.data("cke-caption-placeholder"))&&c(this):this.parts.caption.data("cke-caption-placeholder",
this.editor.lang.imagebase.captionPlaceholder),a(f,!0);else if(!this.editables.caption.getData()||this.parts.caption.data("cke-caption-placeholder"))c(this),a(f,!1)}}}(),upload:function(){var c={progressReporterType:n,setUp:function(a,b){a.on("paste",function(d){var f=d.data.method,g=d.data.dataTransfer,e=g&&g.getFilesCount();if(!a.readOnly&&("drop"===f||"paste"===f&&e)){var h=[];b=a.widgets.registered[b.name];for(var k=0;k<e;k++)f=g.getFile(k),CKEDITOR.fileTools.isTypeSupported(f,b.supportedTypes)&&
h.push(f);h.length&&(d.cancel(),d.stop(),CKEDITOR.tools.array.forEach(h,function(d,f){var g=c._spawnLoader(a,d,b,d.name);c._insertWidget(a,b,URL.createObjectURL(d),!0,{uploadId:g.id});f!==h.length-1&&(g=a.getSelection().getRanges(),g[0].enlarge(CKEDITOR.ENLARGE_ELEMENT),g[0].collapse(!1))}))}})},init:function(){this.once("ready",function(){var a=this.data.uploadId;"undefined"!==typeof a&&(a=this.editor.uploadRepository.loaders[a])&&this._beginUpload(this,a)})},_isLoaderDone:function(a){return a.xhr&&
4===a.xhr.readyState},_spawnLoader:function(a,b,d,c){var g=d.loadMethod||"loadAndUpload";a=a.uploadRepository.create(b,c,d.loaderType);a[g](d.uploadUrl,d.additionalRequestParameters);return a},_beginUpload:function(a,b){function d(){a.isInited()&&a.setData("uploadId",void 0);a.wrapper.removeClass("cke_widget_wrapper_uploading")}function c(){d();!1!==a.fire("uploadFailed",{loader:b})&&a.editor.widgets.del(a)}var g={uploaded:function(){d();a.fire("uploadDone",{loader:b})},abort:c,error:c},e=[];e.push(b.on("abort",
g.abort));e.push(b.on("error",g.error));e.push(b.on("uploaded",g.uploaded));this.on("destroy",function(){CKEDITOR.tools.array.filter(e,function(a){a.removeListener();return!1})});a.setData("uploadId",b.id);if(!1!==a.fire("uploadStarted",b)&&a.progressReporterType)if(!a._isLoaderDone(b))a.wrapper.addClass("cke_widget_wrapper_uploading"),g=new a.progressReporterType,a.wrapper.append(g.wrapper),g.bindLoader(b);else if(g[b.status])g[b.status]()},_insertWidget:function(a,b,c,f,g){var e=("function"==typeof b.defaults?
b.defaults():b.defaults)||{},e=CKEDITOR.tools.extend({},e);e.src=c;c=CKEDITOR.dom.element.createFromHtml(b.template.output(e));var e=a.widgets.wrapElement(c,b.name),h=new CKEDITOR.dom.documentFragment(e.getDocument());h.append(e);return!1!==f?(a.widgets.initOn(c,b,g),a.widgets.finalizeCreation(h)):c}};return c}(),link:function(){function c(a){a.addMenuGroup("imagebase",10);a.addMenuItem("imagebase",{label:a.lang.link.menu,command:"link",group:"imagebase"})}function a(a,c,b){return function(){if(b&&
l(b,"link")){a.stop();var e={};c.commitContent(e);b.setData("link",e)}}}function b(a,c,b){a.getCommand("unlink").on(c,function(c){var f=p(a);f&&l(f,"link")&&(c.stop(),b&&"function"===typeof b&&b(this,f,a),c.cancel())})}return{allowedContent:{a:{attributes:"!href"}},parts:{link:"a"},init:function(){if(this.editor.plugins.link&&this.editor.contextMenu)this.on("contextMenu",function(a){this.parts.link&&(a.data.link=a.data.unlink=CKEDITOR.TRISTATE_OFF)})},setUp:function(d){d.plugins.link&&(d.contextMenu&&
c(d),d.on("dialogShow",function(c){var b=p(d),e=c.data,h,k;b&&l(b,"link")&&"link"===e._.name&&(h=e.getContentElement("info","linkDisplayText").getElement().getParent().getParent(),e.setupContent(b.data.link||{}),h.hide(),k=e.once("ok",a(c,e,b),null,null,9),e.once("hide",function(){k.removeListener();h.show()}))}),b(d,"exec",function(a,c,b){c.setData("link",null);a.refresh(b,b.elementPath())}),b(d,"refresh",function(a,b){a.setState(b.parts.link?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}))},
data:function(a){var b=this.editor,c=a.data.link,e=this.element.findOne("img");"undefined"===typeof c&&this.parts.link&&this.setData("link",CKEDITOR.plugins.link.parseLinkAttributes(this.editor,this.parts.link));if("undefined"!==typeof c)if(null===c)this.parts.link.remove(!0),this.parts.link=null,delete a.data.link;else{a=this.parts;var h=e.getAscendant("a")||b.document.createElement("a"),b=CKEDITOR.plugins.link.getLinkAttributes(b,c);CKEDITOR.tools.isEmpty(b.set)||h.setAttributes(b.set);b.removed.length&&
h.removeAttributes(b.removed);h.contains(e)||(h.replace(e),e.move(h));a.link=h}}}}()},q=100;m.prototype={updated:function(){},done:function(){this.remove()},aborted:function(){this.remove()},failed:function(){this.remove()},remove:function(){this.wrapper.remove()},bindLoader:function(c){function a(){b&&(CKEDITOR.tools.array.forEach(b,function(a){a.removeListener()}),b=null)}var b=[],d=CKEDITOR.tools.eventsBuffer(q,function(){c.uploadTotal&&this.updated(c.uploaded/c.uploadTotal)},this);b.push(c.on("update",
d.input,this));b.push(c.once("abort",this.aborted,this));b.push(c.once("uploaded",this.done,this));b.push(c.once("error",this.failed,this));b.push(c.once("abort",a));b.push(c.once("uploaded",a));b.push(c.once("error",a))}};n.prototype=new m;n.prototype.updated=function(c){c=Math.round(100*c);c=Math.max(c,0);c=Math.min(c,100);this.bar.setStyle("width",c+"%")};CKEDITOR.plugins.add("imagebase",{requires:"widget,filetools",lang:"az,bg,cs,da,de,en,en-au,et,fa,fr,gl,hr,hu,it,ku,lt,lv,nb,nl,pl,pt,pt-br,ro,ru,sk,sq,sr,sr-latn,sv,tr,ug,uk,zh,zh-cn",
init:function(c){r||(CKEDITOR.document.appendStyleSheet(this.path+"styles/imagebase.css"),r=!0);c.addContentsCss&&c.addContentsCss(this.path+"styles/imagebase.css")}});CKEDITOR.plugins.imagebase={featuresDefinitions:v,addImageWidget:function(c,a,b){a=c.widgets.add(a,u(c,b));c.addFeature(a)},addFeature:function(c,a,b){function d(a,b){if(a||b)return function(){a&&a.apply(this,arguments);b&&b.apply(this,arguments)}}var f=CKEDITOR.tools.clone(this.featuresDefinitions[a]);f.init=d(b.init,f.init);f.data=
d(b.data,f.data);f.setUp&&(f.setUp(c,b),delete f.setUp);c=CKEDITOR.tools.object.merge(b,f);CKEDITOR.tools.isArray(c.features)||(c.features=[]);c.features.push(a);return c},progressBar:n,progressReporter:m}})();