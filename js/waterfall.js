/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * 内容JSON
     */
  var demoContent = [
    {
      demo_link: 'https://www.xiunobbs.cn/',
      img_link: '',
      code_link: 'http://git.oschina.net/xiuno/xiunobbs',
      title: 'Xiuno BBS',
      core_tech: 'PHP',
      description: '探索永无止境 XIUNOBBS 4.0 即将到来'
    },{
      demo_link: 'https://cn.wordpress.org/',
      img_link: '',
      title: 'WordPress',
      core_tech: 'PHP',
      description: 'WordPress是一个注重美学、易用性和网络标准的个人信息发布平台，WordPress虽为免费的开源软件。'
    },{
      demo_link: 'http://jekyll.com.cn/',
      img_link: '',
      title: 'Jekyll',
      core_tech: 'Ruby',
      description: '将纯文本转化为静态网站和博客，无需数据库、评论功能，不需要不断的更新版本——只用关心你的博客内容。'
    },{
      demo_link: 'https://cloudreve.org/',
      img_link: '',
      title: 'Cloudreve',
      core_tech: 'go',
      description: '在 Web 端，Cloudreve 提供了强大的文件管理及上传组件，通过拖拽管理文件；多选、范围选择批量操作文件，对文件进行分享、移动、复制、压缩等操作。'
    },{
      demo_link: 'https://kohgylw.github.io/',
      img_link: '',
      title: 'Kiftd',
      core_tech: 'JavaScript',
      description: '一款面向个人、团队、小型组织的网盘应用系统，免费、开源、完善、操作简单。'
    }
  ];

  contentInit(demoContent) //内容初始化
  waitImgsLoad() //等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  // var htmlArr = [];
  // for (var i = 0; i < content.length; i++) {
  //     htmlArr.push('<div class="grid-item">')
  //     htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
  //     htmlArr.push('<img src="'+content[i].img_link+'">')
  //     htmlArr.push('</a>')
  //     htmlArr.push('<h3 class="demo-title">')
  //     htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
  //     htmlArr.push('</h3>')
  //     htmlArr.push('<p>主要技术：'+content[i].core_tech+'</p>')
  //     htmlArr.push('<p>'+content[i].description)
  //     htmlArr.push('<a href="'+content[i].code_link+'">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>')
  //     htmlArr.push('</p>')
  //     htmlArr.push('</div>')
  // }
  // var htmlStr = htmlArr.join('')
  var htmlStr = ''
  for (var i = 0; i < content.length; i++) {
    htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '   </p>' + '</div>'
  }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++
    } else {
      imgs[i].onload = function() {
        // alert('onload')
        count++
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid()
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}
