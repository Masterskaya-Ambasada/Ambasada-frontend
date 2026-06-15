export default {
  rules: {
    "css-modules-camelcase": {
      meta: {
        type: "problem",
        messages: {
          notCamelCase: 'Название стиля "{{name}}" должно быть в camelCase.',
        },
      },
      create(context) {
        function toCamelCase(str) {
          return str.replace(/[-_]([a-z])/g, (_, letter) =>
            letter.toUpperCase(),
          );
        }

        function isCamelCase(str) {
          return /^[a-z][a-zA-Z0-9]*$/.test(str);
        }

        return {
          MemberExpression(node) {
            if (
              node.object.type === "Identifier" &&
              node.object.name === "styles"
            ) {
              let propertyName = null;

              // Случай: styles.className
              if (node.property.type === "Identifier") {
                propertyName = node.property.name;
              }
              // Случай: styles["className"]
              else if (
                node.property.type === "Literal" &&
                typeof node.property.value === "string"
              ) {
                propertyName = node.property.value;
              }

              if (propertyName && !isCamelCase(propertyName)) {
                const fixed = toCamelCase(propertyName);
                context.report({
                  node: node.property,
                  messageId: "notCamelCase",
                  data: {
                    name: propertyName,
                    fixed: fixed,
                  },
                });
              }
            }
          },
        };
      },
    },
  },
};
