using System.Collections.Generic;

namespace Elemental.Components;

public static class AeDictionaryExtension
{
    public static void AddOrAppend(this Dictionary<string, List<string>> dictionary, string key, List<string> values)
    {
        if (dictionary.ContainsKey(key))
        {
            dictionary[key].AddRange(values);
        }
        else
        {
            dictionary.Add(key, values);
        }
    }

}