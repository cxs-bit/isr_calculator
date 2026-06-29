import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";
import * as React from "react";
export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
    const { showArrow, children, disabled, portalled = true, content, contentProps, portalRef, ...rest } = props;
    if (disabled)
        return children;
    return (React.createElement(ChakraTooltip.Root, { ...rest },
        React.createElement(ChakraTooltip.Trigger, { asChild: true }, children),
        React.createElement(Portal, { disabled: !portalled, container: portalRef },
            React.createElement(ChakraTooltip.Positioner, null,
                React.createElement(ChakraTooltip.Content, { ref: ref, ...contentProps },
                    showArrow && (React.createElement(ChakraTooltip.Arrow, null,
                        React.createElement(ChakraTooltip.ArrowTip, null))),
                    content)))));
});
