// 先等图片都加载完成
// 再执行布局函数

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
      img_link: 'https://img2.wait.loan/file/img-hub/1747911079201_xiunobbs.png',
      code_link: 'http://git.oschina.net/xiuno/xiunobbs',
      title: 'Xiuno BBS',
      core_tech: 'PHP',
      description: 'Xiuno BBS 4.0 是 2016 年诞生的，国产、小巧、精悍、采用PHP开发的论坛程序。'
    },{
      demo_link: 'https://cn.wordpress.org/',
      img_link: 'https://img2.wait.loan/file/img-hub/1747911329440_wordpress.jpg',
      title: 'WordPress',
      core_tech: 'PHP',
      description: 'WordPress是一个注重美学、易用性和网络标准的个人信息发布平台，WordPress虽为免费的开源软件。'
    },{
      demo_link: 'http://jekyll.com.cn/',
      img_link: 'https://img2.wait.loan/file/img-hub/1747911076160_jekyll.png',
      title: 'Jekyll',
      core_tech: 'Ruby',
      description: '将纯文本转化为静态网站和博客，无需数据库、评论功能，不需要不断的更新版本——只用关心你的博客内容。'
    },{
      demo_link: 'https://cloudreve.org/',
      img_link: 'https://img2.wait.loan/file/img-hub/1747911080391_logo192.png',
      title: 'Cloudreve',
      core_tech: 'GO',
      description: '在 Web 端，Cloudreve 提供了强大的文件管理及上传组件，通过拖拽管理文件；多选、范围选择批量操作文件，对文件进行分享、移动、复制、压缩等操作。'
    },{
      demo_link: 'https://kohgylw.github.io/',
      img_link: 'https://img2.wait.loan/file/img-hub/1747911076090_kiftd.png',
      title: 'Kiftd',
      core_tech: 'Java',
      description: '一款面向个人、团队、小型组织的网盘应用系统，免费、开源、完善、操作简单。'
    },
  ]

  contentInit(demoContent) //内容初始化
  initGrid()
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  var htmlArr = [];
  for (var i = 0; i < content.length; i++) {
      htmlArr.push('<div class="grid-item">')
      htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
      if(content[i].img_link) {
        htmlArr.push('<img src="'+content[i].img_link+'" style="width: 100%">')
      }
      htmlArr.push('</a>')
      htmlArr.push('<h3 class="demo-title">')
      htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
      htmlArr.push('</h3>')
      if (content[i].core_tech) {
        htmlArr.push('<p>Main tech：'+content[i].core_tech+'</p>')
      }
      htmlArr.push('<p>'+content[i].description)
      if (content[i].code_link) {
        htmlArr.push('<a href="'+content[i].code_link+'"> Source code <i class="fa fa-code" aria-hidden="true"></i></a>')
      }
      htmlArr.push('</p>')
      htmlArr.push('</div>')
  }
  var htmlStr = htmlArr.join('')
  // var htmlStr = ''
  // for (var i = 0; i < content.length; i++) {
  //   htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' + '   </p>' + '</div>'

  //   // htmlStr += `
  //   //   <div class="grid-item">
  //   //     <a class="a-img" href="${content[i].demo_link}">
  //   //     <img src="${content[i].img_link}">
  //   // `
  // }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var grid = document.querySelector('.grid');
  var msnry = new Masonry(grid, {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    // percentPosition: true,
    isFitWidth: true,
    gutter: 20
  })

  imagesLoaded(grid).on('progress', throttle(function() {
    // layout Masonry after each image loads
      msnry.layout();
  }, 1600, {
    leading: false,
    trailing: true,
  }));
}

function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
  };

  var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          func.apply(context, args);
          if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
      }
  };
  return throttled;
}
