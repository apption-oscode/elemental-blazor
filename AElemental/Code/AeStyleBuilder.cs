using System;
using System.Collections.Generic;

namespace AElemental.Code;

public struct AeStyleBuilder
{
    private string stringBuffer;

    /// <summary>
    /// Creates a StyleBuilder used to define conditional in-line style used in a component. Call Build() to return the completed style as a string.
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="value"></param>
    public static AeStyleBuilder Default(string prop, string value) => new AeStyleBuilder(prop, value);

    /// <summary>
    /// Creates a StyleBuilder used to define conditional in-line style used in a component. Call Build() to return the completed style as a string.
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="value"></param>
    public static AeStyleBuilder Default(string style) => Empty().AddStyle(style);

    /// <summary>
    /// Creates a StyleBuilder used to define conditional in-line style used in a component. Call Build() to return the completed style as a string.
    /// </summary>
    public static AeStyleBuilder Empty() => new AeStyleBuilder();

    /// <summary>
    /// Creates a StyleBuilder used to define conditional in-line style used in a component. Call Build() to return the completed style as a string.
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="value"></param>
    public AeStyleBuilder(string prop, string value) => stringBuffer = $"{prop}:{value};";

    /// <summary>
    /// Adds a conditional in-line style to the builder with space separator and closing semicolon.
    /// </summary>
    /// <param name="style"></param>
    public AeStyleBuilder AddStyle(string style) => !string.IsNullOrWhiteSpace(style) ? AddRaw($"{style};") : this;

    /// <summary>
    /// Adds a raw string to the builder that will be concatenated with the next style or value added to the builder.
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="value"></param>
    /// <returns>StyleBuilder</returns>
    private AeStyleBuilder AddRaw(string style)
    {
        stringBuffer += style;
        return this;
    }

    /// <summary>
    /// Adds a conditional in-line style to the builder with space separator and closing semicolon..
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="value">Style to add</param>
    /// <returns>StyleBuilder</returns>
    public AeStyleBuilder AddStyle(string prop, string value) => AddRaw($"{prop}:{value};");

    /// <summary>
    /// Adds a conditional in-line style to the builder with space separator and closing semicolon..
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="value">Style to conditionally add.</param>
    /// <param name="when">Condition in which the style is added.</param>
    /// <returns>StyleBuilder</returns>
    public AeStyleBuilder AddStyle(string prop, string value, bool when = true) =>
        when ? this.AddStyle(prop, value) : this;


    /// <summary>
    /// Adds a conditional in-line style to the builder with space separator and closing semicolon..
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="value">Style to conditionally add.</param>
    /// <param name="when">Condition in which the style is added.</param>
    /// <returns></returns>
    public AeStyleBuilder AddStyle(string prop, Func<string> value, bool when = true) =>
        when ? this.AddStyle(prop, value()) : this;

    /// <summary>
    /// Adds a conditional in-line style to the builder with space separator and closing semicolon..
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="value">Style to conditionally add.</param>
    /// <param name="when">Condition in which the style is added.</param>
    /// <returns>StyleBuilder</returns>
    public AeStyleBuilder AddStyle(string prop, string value, Func<bool> when = null) =>
        this.AddStyle(prop, value, when());

    /// <summary>
    /// Adds a conditional in-line style to the builder with space separator and closing semicolon..
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="value">Style to conditionally add.</param>
    /// <param name="when">Condition in which the style is added.</param>
    /// <returns>StyleBuilder</returns>
    public AeStyleBuilder AddStyle(string prop, Func<string> value, Func<bool> when = null) =>
        this.AddStyle(prop, value(), when());

    /// <summary>
    /// Adds a conditional nested StyleBuilder to the builder with separator and closing semicolon.
    /// </summary>
    /// <param name="builder">Style Builder to conditionally add.</param>
    /// <returns>StyleBuilder</returns>
    public AeStyleBuilder AddStyle(AeStyleBuilder builder) => this.AddRaw(builder.Build());

    /// <summary>
    /// Adds a conditional nested StyleBuilder to the builder with separator and closing semicolon.
    /// </summary>
    /// <param name="builder">Style Builder to conditionally add.</param>
    /// <param name="when">Condition in which the style is added.</param>
    /// <returns>StyleBuilder</returns>
    public AeStyleBuilder AddStyle(AeStyleBuilder builder, bool when = true) =>
        when ? this.AddRaw(builder.Build()) : this;

    /// <summary>
    /// Adds a conditional in-line style to the builder with space separator and closing semicolon..
    /// </summary>
    /// <param name="builder">Style Builder to conditionally add.</param>
    /// <param name="when">Condition in which the styles are added.</param>
    /// <returns>StyleBuilder</returns>
    public AeStyleBuilder AddStyle(AeStyleBuilder builder, Func<bool> when = null) => this.AddStyle(builder, when());

    /// <summary>
    /// Adds a conditional in-line style to the builder with space separator and closing semicolon..
    /// A ValueBuilder action defines a complex set of values for the property.
    /// </summary>
    /// <param name="prop"></param>
    /// <param name="builder"></param>
    /// <param name="when"></param>
    public AeStyleBuilder AddStyle(string prop, Action<ValueBuilder> builder, bool when = true)
    {
        ValueBuilder values = new ValueBuilder();
        builder(values);
        return AddStyle(prop, values.ToString(), when && values.HasValue);
    }

    /// <summary>
    /// Adds a conditional in-line style when it exists in a dictionary to the builder with separator.
    /// Null safe operation.
    /// </summary>
    /// <param name="additionalAttributes">Additional Attribute splat parameters</param>
    /// <returns>StyleBuilder</returns>
    public AeStyleBuilder AddStyleFromAttributes(IReadOnlyDictionary<string, object> additionalAttributes) =>
        additionalAttributes == null ? this :
        additionalAttributes.TryGetValue("style", out var c) ? AddRaw(c.ToString()) : this;

    /// <summary>
    /// Adds a dictionary mapping of additional in-line styles to the builder
    /// </summary>
    /// <param name="additionalStyles"></param>
    /// <returns>StyleBuilder</returns>
    public AeStyleBuilder AddStylesFromDictionary(IReadOnlyDictionary<string, string> additionalStyles)
    {
        foreach (var (prop, value) in additionalStyles)
        {
            AddRaw($"{prop}: {value};");
        }

        return this;
    }

    /// <summary>
    /// Finalize the completed Style as a string.
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

public class ValueBuilder
{
    private string stringBuffer;

    public bool HasValue => !string.IsNullOrWhiteSpace(stringBuffer);
    /// <summary>
    /// Adds a space separated conditional value to a property.
    /// </summary>
    /// <param name="value"></param>
    /// <param name="when"></param>
    /// <returns></returns>
    public ValueBuilder AddValue(string value, bool when = true) => when ? AddRaw($"{value} ") : this;
    public ValueBuilder AddValue(Func<string> value, bool when = true) => when ? AddRaw($"{value()} ") : this;

    private ValueBuilder AddRaw(string style)
    {
        stringBuffer += style;
        return this;
    }

    public override string ToString() => stringBuffer != null ? stringBuffer.Trim() : string.Empty;
}

public static class BuilderExtensions
{
    /// <summary>
    /// Used to convert a CssBuilder into a null when it is empty.
    /// Usage: class=null causes the attribute to be excluded when rendered.
    /// </summary>
    /// <param name="builder"></param>
    /// <returns>string</returns>
    public static string NullIfEmpty(this AeCssBuilder builder) =>
        string.IsNullOrEmpty(builder.ToString()) ? null : builder.ToString();

    /// <summary>
    /// Used to convert a StyleBuilder into a null when it is empty.
    /// Usage: style=null causes the attribute to be excluded when rendered.
    /// </summary>
    /// <param name="builder"></param>
    /// <returns>string</returns>
    public static string NullIfEmpty(this AeStyleBuilder builder) =>
        string.IsNullOrEmpty(builder.ToString()) ? null : builder.ToString();

    /// <summary>
    /// Used to convert a string.IsNullOrEmpty into a null when it is empty.
    /// Usage: attribute=null causes the attribute to be excluded when rendered.
    /// </summary>
    /// <param name="builder"></param>
    /// <returns>string</returns>
    public static string NullIfEmpty(this string s) =>
        string.IsNullOrEmpty(s) ? null : s;

}