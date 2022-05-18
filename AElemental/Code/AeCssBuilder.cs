using System;
using System.Collections.Generic;

namespace AElemental.Code;

public struct AeCssBuilder
{
    private string stringBuffer;
        private string prefix;

        /// <summary>
        /// Sets the prefix value to be appended to all classes added following the this statement. When SetPrefix is called it will overwrite any previous prefix set for this instance. Prefixes are not applied when using AddValue.
        /// </summary>
        /// <param name="value"></param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder SetPrefix(string value)
        {
            prefix = value;
            return this;
        }

        /// <summary>
        /// Creates a AeCssBuilder used to define conditional CSS classes used in a component.
        /// Call Build() to return the completed CSS Classes as a string. 
        /// </summary>
        /// <param name="value"></param>
        public static AeCssBuilder Default(string value) => new AeCssBuilder(value);

        /// <summary>
        /// Creates an Empty AeCssBuilder used to define conditional CSS classes used in a component.
        /// Call Build() to return the completed CSS Classes as a string. 
        /// </summary>
        public static AeCssBuilder Empty() => new AeCssBuilder();

        /// <summary>
        /// Creates a AeCssBuilder used to define conditional CSS classes used in a component.
        /// Call Build() to return the completed CSS Classes as a string. 
        /// </summary>
        /// <param name="value"></param>
        public AeCssBuilder(string value)
        {
            stringBuffer = value;
            prefix = string.Empty;
        }

        /// <summary>
        /// Adds a raw string to the builder that will be concatenated with the next class or value added to the builder.
        /// </summary>
        /// <param name="value"></param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder AddValue(string value)
        {
            stringBuffer += value;
            return this;
        }

        /// <summary>
        /// Adds a CSS Class to the builder with space separator.
        /// </summary>
        /// <param name="value">CSS Class to add</param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder AddClass(string value) => AddValue(" " + prefix + value);

        /// <summary>
        /// Adds a conditional CSS Class to the builder with space separator.
        /// </summary>
        /// <param name="value">CSS Class to conditionally add.</param>
        /// <param name="when">Condition in which the CSS Class is added.</param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder AddClass(string value, bool when = true) => when ? this.AddClass(value) : this;

        /// <summary>
        /// Adds a conditional CSS Class to the builder with space separator.
        /// </summary>
        /// <param name="value">CSS Class to conditionally add.</param>
        /// <param name="when">Condition in which the CSS Class is added.</param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder AddClass(string value, Func<bool> when = null) => this.AddClass(value, when());

        /// <summary>
        /// Adds a conditional CSS Class to the builder with space separator.
        /// </summary>
        /// <param name="value">Function that returns a CSS Class to conditionally add.</param>
        /// <param name="when">Condition in which the CSS Class is added.</param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder AddClass(Func<string> value, bool when = true) => when ? this.AddClass(value()) : this;

        /// <summary>
        /// Adds a conditional CSS Class to the builder with space separator.
        /// </summary>
        /// <param name="value">Function that returns a CSS Class to conditionally add.</param>
        /// <param name="when">Condition in which the CSS Class is added.</param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder AddClass(Func<string> value, Func<bool> when = null) => this.AddClass(value, when());

        /// <summary>
        /// Adds a conditional nested AeCssBuilder to the builder with space separator.
        /// </summary>
        /// <param name="value">CSS Class to conditionally add.</param>
        /// <param name="when">Condition in which the CSS Class is added.</param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder AddClass(AeCssBuilder builder, bool when = true) => when ? this.AddClass(builder.Build()) : this;

        /// <summary>
        /// Adds a conditional CSS Class to the builder with space separator.
        /// </summary>
        /// <param name="value">CSS Class to conditionally add.</param>
        /// <param name="when">Condition in which the CSS Class is added.</param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder AddClass(AeCssBuilder builder, Func<bool> when = null) => this.AddClass(builder, when());

        /// <summary>
        /// Adds a conditional CSS Class when it exists in a dictionary to the builder with space separator.
        /// Null safe operation.
        /// </summary>
        /// <param name="additionalAttributes">Additional Attribute splat parameters</param>
        /// <returns>AeCssBuilder</returns>
        public AeCssBuilder AddClassFromAttributes(IReadOnlyDictionary<string, object> additionalAttributes) =>
            additionalAttributes == null ? this :
            additionalAttributes.TryGetValue("class", out var c) && c != null ? AddClass(c.ToString()) : this;

        /// <summary>
        /// Finalize the completed CSS Classes as a string.
        /// </summary>
        /// <returns>string</returns>
        public string Build()
        {
            // String buffer finalization code
            return stringBuffer != null ? stringBuffer.Trim() : string.Empty;
        }

        // ToString should only and always call Build to finalize the rendered string.
        public override string ToString() => Build();
}