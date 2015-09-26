/**
 These methods parses the cssObject into a more efficient DataStore
 which helps in fast searching of the CSS properties
 */
function getCssPropertyObject(parsedCssObject) {

    var cssResource = {};

    var element

    var rules = parsedCssObject.stylesheet.rules;

    for (var i = 0; i < rules.length; i++) {

        if (rules[i].type == "rule") {

            var selectors = rules[i].selectors;

            for (var j = 0; j < selectors.length; j++) {

                if (selectors[j].indexOf(".") == 0) {

                    var declarations = rules[i].declarations;

                    for (var k = 0; k < declarations.length; k++) {

                        var cssProperty = declarations[k].property;
                        var cssValue = declarations[k].value;
                        element = cssResource[cssProperty];

                        if (element != null && element != undefined) {
                            cssResource[cssProperty][element.length] = {
                                class: selectors[j].substring(1),
                                value: cssValue
                            };
                        }
                        else {
                            cssResource[cssProperty] = []
                            cssResource[cssProperty][0] = {class: selectors[j].substring(1), value: cssValue};
                        }
                    }
                }
            }
        }
    }

    return cssResource;
}

function getCssClassObject(parsedCssObject) {

    var cssClassResource = {};

    var element

    var rules = parsedCssObject.stylesheet.rules;

    for (var i = 0; i < rules.length; i++) {

        if (rules[i].type == "rule") {
            var declarations = rules[i].declarations;
            var declarationsArr = []
            for (var k = 0; k < declarations.length; k++) {
                var cssProperty = declarations[k].property;
                var cssValue = declarations[k].value;
                declarationsArr.push({
                    property: cssProperty,
                    value: cssValue
                })
            }

            var selectors = rules[i].selectors;
            for (var j = 0; j < selectors.length; j++) {
                if (selectors[j].indexOf(".") == 0) {
                    var className=selectors[j].substring(1)
                    element = cssClassResource[className]
                    if (element != null && element != undefined) {
                        cssClassResource[className].concat(declarationsArr)
                    } else {
                        cssClassResource[className] = declarationsArr
                    }
                }
            }
        }


    }
    return cssClassResource;

}

exports.getCssPropertyObject = getCssPropertyObject;
exports.getCssClassObject = getCssClassObject;