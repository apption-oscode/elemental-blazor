using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Elemental.Code
{
    public static class Extensions
    {
        public static HashSet<T> ToHashSet<T>(this IEnumerable<T> source, IEqualityComparer<T> comparer = null)
        {
            return new HashSet<T>(source, comparer);
        }

        /// <summary>
        /// Used for pagination
        /// </summary>        
        //used by LINQ to SQL
        public static IQueryable<TSource> Page<TSource>(this IQueryable<TSource> source, int pageIndex, int pageSize)
        {
            return source.Skip(pageIndex * pageSize).Take(pageSize);
        }

        /// <summary>
        /// Used for pagination
        /// </summary>       
        //used by LINQ
        public static IEnumerable<TSource> Page<TSource>(this IEnumerable<TSource> source, int pageIndex, int pageSize)
        {
            return source.Skip(pageIndex * pageSize).Take(pageSize);
        }
    }
}