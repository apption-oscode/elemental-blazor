window.sidenav = {
    sidenavExpandThreshold: null,
    sidenavShrinkThreshold: null,
    stayCollapse: false,
    toggleExpansion: closeSidenav => {
        if (closeSidenav === undefined || closeSidenav === null) {
            closeSidenav = $('.ae.sidenav').hasClass('expanded');
        }
        var sidenav = $('.ae.sidenav');
        var main = $('.ae.content-wrapper');
        if (closeSidenav) {
            sidenav.removeClass('expanded');
            main.css('margin-left', 60);
        }
        else {
            sidenav.addClass('expanded');
        }

        if ($(window).width() > window.sidenav.sidenavExpandThreshold) {
            if (!closeSidenav) {                
                main.css('margin-left', 300);
            }            
        }        
        //$('.toggle-expand > i').toggleClass('fa-chevron-double-left').toggleClass('fa-chevron-double-right');
    },

    initializeSidenav: (firstRender, expandThreshold, shrunkThreshold, stayCollapse) => {
        window.sidenav.sidenavExpandThreshold = expandThreshold;
        window.sidenav.sidenavShrinkThreshold = shrunkThreshold;
        window.sidenav.stayCollapse = stayCollapse;
        let _sidenav = $('.ae.sidenav');
        let _sidenavMainMenu = $('.ae.sidenav-main-menu');
        let _window = $(window);
        

        if (firstRender && _window.width() > window.sidenav.sidenavExpandThreshold && IfSubMenuExist()) {
            //$('.toggle-expand').hide();
            window.sidenav.toggleExpansion(false);
        }


        if (!window.sidenav.stayCollapse) {
            _window.resize(() => {
                if (_window.width() > window.sidenav.sidenavExpandThreshold && !_sidenav.hasClass('expanded') && IfSubMenuExist()) {
                    window.sidenav.toggleExpansion(false);
                    //$('.toggle-expand').show();
                    return;
                }

                if (_window.width() < window.sidenav.sidenavShrinkThreshold && _sidenav.hasClass('expanded')) {
                    window.sidenav.toggleExpansion(true);
                    //$('.toggle-expand').hide();
                    return;
                }
            })

            _sidenavMainMenu.children(`.ae.sidenav-item`).mouseenter(e => {
                let href = $(e.currentTarget).attr("href");
                let subMenuGroup = $(`[data-nav-href="${href}"]`);
                if (_window.width() < window.sidenav.sidenavShrinkThreshold) {
                    if (subMenuGroup.children(`[href*="${href}/"]`).length != 0) {

                        RemoveAllOfArrayOfClasses([
                            "expanded"
                        ]);

                        subMenuGroup.addClass('expanded');
                        window.sidenav.toggleExpansion(false);
                        return;
                    }
                    else {
                        window.sidenav.toggleExpansion(true);
                        return;
                    }
                }
            })
            _sidenav.mouseleave(() => {
                if (_window.width() < window.sidenav.sidenavShrinkThreshold) {                
                    window.sidenav.toggleExpansion(true);
                    return;
                }
            })        
        }
    },

    updateNav: () =>
    {
        let href = window.location.pathname.substr(1);
        let splitHref = href.split('/');

        RemoveAllOfArrayOfClasses([
            "expanded",
            "exact",
            "active",
        ]);

        $(`[href="/${href}"]`).addClass('exact');

        if (splitHref.length > 0) {
            let activeMainHref = splitHref[0];
            let subMenuGroup = $(`[data-nav-href="/${activeMainHref}"]`);
            
            subMenuGroup.addClass('expanded');

            $(`[href="/${activeMainHref}"]`).addClass('active');

            //if sub menu is empty, collapse
            if ($('.ae.sidenav').hasClass('expanded') && subMenuGroup.children(`[href*="/${activeMainHref}/"]`).length == 0) {
                window.sidenav.toggleExpansion(true);
            }
            //if sub menu is not empty, expand
            else if (!$('.ae.sidenav').hasClass('expanded') && subMenuGroup.children(`[href*="/${activeMainHref}/"]`).length != 0) {
                window.sidenav.toggleExpansion(false);
            }

            if (splitHref.length > 1) {

                let activeSubMenuHref = `${activeMainHref}/${splitHref[1]}`;
                let activeSubMenuItem = subMenuGroup.children(`[href="/${activeSubMenuHref}"]`);

                if (activeSubMenuItem.length == 0) {
                    window.sidenav.toggleExpansion(true);
                }
                else {
                    activeSubMenuItem.addClass('active');

                    let subSubMenuGroup = $(`[data-nav-href="/${activeSubMenuHref}"]`);
                    subSubMenuGroup.addClass('expanded');


                    if (splitHref.length > 2) {

                        let activeDatabaseHref = `${activeSubMenuHref}/${splitHref[2]}`;
                        let activeDatabase = subSubMenuGroup.children(`[href="/${activeDatabaseHref}"]`);
                        activeDatabase.addClass('active');
                    }
                }
            }
            
        }
        
    },
};

function RemoveAllOfArrayOfClasses(list) {
    list.forEach(classname => RemoveAllOfClass(classname))
}

function RemoveAllOfClass(classname) {
    $(`.ae.sidenav-container .${classname}`).removeClass(classname);
    $(`.sidenav-group-wrapper .${classname}`).removeClass(classname);
}

function IfSubMenuExist() {
    let href = window.location.pathname.substr(1);
    let splitHref = href.split('/');
    let activeMainHref = splitHref[0];
    let subMenuGroup = $(`[data-nav-href="/${activeMainHref}"]`);
    return subMenuGroup.children(`[href*="/${activeMainHref}/"]`).length != 0;
}

$(document).ready(function () {
    //console.log($(".ae.sidenav").width())
});