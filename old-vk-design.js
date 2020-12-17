// ==UserScript==
// @name         Old VK Design
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  I Hate New Design!
// @author       D4ker
// @match        https://vk.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function setOldDesign() {
        document.body.classList.remove(classWithNewDesign);

        /*
        // Поправить слово "Поиск"
        let searchElement = document.getElementsByClassName("input_back");

        // Почему-то происходит баг и элемент оказывается пустой (наверное потому что input иногда не успевает создаться?)
        if (searchElement[0]) {
            searchElement[0].style.paddingTop = "12px";
        }
        */
    }

    var classWithNewDesign = "new_header_design";
    var elemToObserve = document.body;

    var prevClassState = elemToObserve.classList.contains(classWithNewDesign);
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName == "class") {
                var currentClassState = mutation.target.classList.contains(classWithNewDesign);
                if (prevClassState !== currentClassState) {
                    prevClassState = currentClassState;
                    if (currentClassState) {
                        console.log("Class added!");
                        setOldDesign();
                    } else {
                        console.log("Class removed!");
                        console.log("Old Design Activated. YAY!");
                    }
                }
            }
        });
    });

    observer.observe(elemToObserve, {
        attributes: true
    });

    setOldDesign();
})();