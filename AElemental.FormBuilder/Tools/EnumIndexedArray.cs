using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

// Originally from: https://stackoverflow.com/a/26781065

namespace AElemental.FormBuilder
{
    public class EnumIndexedArray<TKey, T> : IEnumerable<KeyValuePair<TKey, T>> where TKey : Enum
    {
        public EnumIndexedArray()
        {
            // this type check may not be necessary any more now that the definition is TKey : Enum
            if (!typeof (TKey).IsEnum) throw new InvalidOperationException("Generic type argument is not an Enum");
            var size = Convert.ToInt32(Keys.Max()) + 1;
            Values = new T[size];
        }

        protected T[] Values;

        public static IEnumerable<TKey> Keys
        {
            get { return Enum.GetValues(typeof (TKey)).OfType<TKey>(); }
        }

        public T this[TKey index]
        {
            get { return Values[Convert.ToInt32(index)]; }
            set { Values[Convert.ToInt32(index)] = value; }
        }

        private IEnumerable<KeyValuePair<TKey, T>> CreateEnumerable()
        {
            return Keys.Select(key => new KeyValuePair<TKey, T>(key, Values[Convert.ToInt32(key)]));
        }

        public IEnumerator<KeyValuePair<TKey, T>> GetEnumerator()
        {
            return CreateEnumerable().GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        // lets us initialize the collection with values
        public void Add(TKey key, T value)
        {
            this[key] = value;
        }
    }
}