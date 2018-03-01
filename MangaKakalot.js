var MangaKakalot = {
    mirrorName: "MangaKakalot",
    canListFullMangas: false,
    mirrorIcon: "img/mangakakalot.png",
    languages: "en",
    isMe: function(url) {
        "use strict";
        return (url.indexOf("mangakakalot") !== -1);
    },
    getMangaList: function(search, callback) {
        "use strict";
        var urlManga = "http://mangakakalot.com/search/" + search;
        console.log("getMangaList");
        // $.ajax({
        //     url: urlManga,
        //     beforeSend: function(xhr) {
        //         xhr.setRequestHeader("Cache-Control", "no-cache");
        //         xhr.setRequestHeader("Pragma", "no-cache");
        //     },
        //     success: function(objResponse) {
        //         var div = document.createElement("div");
        //         div.innerHTML = objResponse.replace(/<img/gi, '<noload');
        //         if (objResponse.indexOf("No Manga Series") !== -1) {
        //             callback("MangaKakalot", []);
        //         } else {
        //             var res = [];
        //             $("#listing tr td:first-child a", div).each(function(index) {
        //                 res[index] = [$(this).html(),
        //                     $(this).attr("href")
        //                 ];
        //             });
        //             callback("MangaKakalot", res);
        //         }
        //     }
        // });
    },
    // Return all Chapter URLs for urlManga
    getListChaps: function(urlManga, mangaName, obj, callback) {
        "use strict";
        console.log("getListChaps " + urlManga);
        $.ajax({
            url: urlManga,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Cache-Control", "no-cache");
                xhr.setRequestHeader("Pragma", "no-cache");
            },
            success: function(objResponse) {
                var div = document.createElement("div");
                objResponse = objResponse.replace(/<img\b[^>]*>/ig, ''); //avoid loading cover image
                div.innerHTML = objResponse;
                // console.log(div);
                var res = [];
                var chapters = $("a", $(".chapter-list", div)[0]);
                if(chapters.lenth == 0) {
                    console.log("Found no chapters!");
                }
                // console.log(chapters.length);
                for(let index = 0; index < chapters.length; ++index) {
                    // console.log(chapters[index].innerText);
                    // console.log(chapters[index].href);
                    res.push([chapters[index].innerText, chapters[index].href])
                }
                callback(res, obj);
            }
        });
        // $.ajax({
        //     url: urlManga,
        //     beforeSend: function(xhr) {
        //         xhr.setRequestHeader("Cache-Control", "no-cache");
        //         xhr.setRequestHeader("Pragma", "no-cache");
        //     },
        //     success: function(objResponse) {
        //         var div = document.createElement("div");
        //         objResponse = objResponse.replace(/<img\b[^>]*>/ig, ''); //avoid loading cover image
        //         div.innerHTML = objResponse;
        //         var res = [];
        //         var mangaName = $('#title h2', div).text().substr(5, $('#title h2', div).text().length - 18);
        //         $("ul.chlist h3, ul.chlist h4", div).each(function(index) {
        //             if ($('a', $(this)).attr("href").indexOf("/manga/") !== -1) {
        //                 var vol = $(this).parents('ul.chlist').prev('div.slide').children('h3').contents(':not(span)').text().trim().substr(7);
        //                 var tit = 'Vol ' + vol + ' Ch ' + $('a', $(this)).text().substr(mangaName.length + 1) + ': ' + $('span.title', $(this)).text();
        //                 var url = $('a', $(this)).attr("href");
        //                 var curChapURL = url.substr(0, url.lastIndexOf("/") + 1);
        //                 if (curChapURL.substr(curChapURL.length - 2, 2) === "//") {
        //                     curChapURL = curChapURL.substr(0, curChapURL.length - 1);
        //                 }
        //                 res[res.length] = [tit.trim(), "http:" + curChapURL + "1.html"];
        //             }
        //         });
        //         callback(res, obj);
        //     }
        // });
    },
    getInformationsFromCurrentPage: function(doc, curUrl, callback) {
        "use strict";
        console.log("getInformationsFromCurrentPage");
        var str = $(".info-top-chapter > h2").text().split("chapter");
        var name = str[0].trim();
        var currentChapter = str[1].trim();
        console.log(name);
        console.log(currentChapter);
        console.log(curUrl);
        var currentMangaUrl = curUrl.substr(0, curUrl.lastIndexOf("/") + 1).replace("chapter", "manga");
        console.log(currentMangaUrl)

        callback({
            "name": name,
            "currentChapter": currentChapter,
            "currentMangaURL": currentMangaUrl,
            "currentChapterURL": curUrl
        });
    },
    getListImages: function(doc, curUrl) {
        "use strict";
        // Returns a list of all chapter urls, for this mirror directly all image urls
        console.log("getListImages");
        // var elements = $("#vungdoc > img", doc) // Get all img inside element with id=vungdoc
        // var res = [];
        // for(let index=0; index < elements.length; ++index) {
        //     res.push(elements[index].currentSrc) // Extract image urls
        // }
        // return res;
    },
    removeBanners: function(doc, curUrl) {
        "use strict";
        // $("#bottom_ads", doc).remove();
        // $('#MarketGid9463', doc).remove();
        // $('.ad', doc).remove();
        // $('#banner', doc).remove();
    },
    whereDoIWriteScans: function(doc, curUrl) {
        "use strict";
        // return $("#viewer", doc);
    },
    whereDoIWriteNavigation: function(doc, curUrl) {
        "use strict";
        return $(".navAMR", doc);
    },
    isCurrentPageAChapterPage: function(doc, curUrl) {
        "use strict";
        console.log("isCurrentPageAChapterPage");
        if ($("#vungdoc", doc) !== null) {
            return ($("#vungdoc", doc).size() !== 0);
        }
        return false;
    },
    doSomethingBeforeWritingScans: function(doc, curUrl) {
        "use strict";
        console.log("doSomethingBeforeWritingScans");
        // $('#viewer', doc).css({
        //     'width': 'auto',
        //     'margin': 'auto',
        //     'background-color': 'black'
        // });
        // $("#image", doc).remove();
        // $("#tool", doc).next().remove();
        // $("#viewer", doc).after("<div class='navAMR'></div>").before("<div class='navAMR'></div>");
        // $(".widepage.page", doc).remove();
        // $('.fb_iframe_widget', doc).remove();
        // if (typeof doc.createElement === 'function') {
        //     var script = doc.createElement('script');
        //     script.innerText = "$(document).unbind('keydown');";
        //     doc.body.appendChild(script);
        // }
    },
    nextChapterUrl: function(select, doc, curUrl) {
        "use strict";
        console.log("nextChapterURL");
        if ($(select).children("option:selected").prev().size() !== 0) {
            return $(select).children("option:selected").prev().val();
        }
        return null;
    },
    previousChapterUrl: function(select, doc, curUrl) {
        "use strict";
        console.log("prevChapterURL");
        if ($(select).children("option:selected").next().size() !== 0) {
            return $(select).children("option:selected").next().val();
        }
        return null;
    },
    getImageFromPageAndWrite: function(urlImg, image, doc, curUrl) {
        "use strict";
        console.log("getImageFromPage");
        // $.ajax({
        //     url: urlImg,
        //     success: function(objResponse) {
        //         var src = $('#image', objResponse).attr('src');
        //         $(image).attr("src", src);
        //     },
        //     error: function() {
        //         $(image).attr("src", "");
        //     }
        // });
    },
    isImageInOneCol: function(img, doc, curUrl) {
        "use strict";
        return false;
    },
    getMangaSelectFromPage: function(doc, curUrl) {
        "use strict";
        return null;
    },
    doAfterMangaLoaded: function(doc, curUrl) {
        "use strict";
        console.log("doAfterMangaLoaded");
        $("body > div:empty", doc).remove();
    }
};
// Call registerMangaObject to be known by includer
if (typeof registerMangaObject == 'function') {
    registerMangaObject("MangaKakalot", MangaKakalot);
}
