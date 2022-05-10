/**
 * Copyright 2020 Apption Corporation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

using System;
using System.Linq.Expressions;
using System.Reflection;

namespace AElemental.Code
{
    public static class ExpressionTools
    {
        public static Expression<Func<T>> GenerateValidatorFunction<T>(this PropertyInfo prop, ConstantExpression instanceExpr)
        {
            var propExpr = Expression.Property(instanceExpr, prop);
            if (prop.PropertyType == typeof(T))
            {
                return Expression.Lambda<Func<T>>(propExpr);//.Compile();
            }
            else
            {
                throw new InvalidOperationException($"Property Type is {prop.PropertyType} - expected type is {typeof(T)} ");
            }
        }

        public static Expression<Func<T>> GenerateValidatorFunction<T>(this PropertyInfo prop, object instance)
        {
            return prop.GenerateValidatorFunction<T>(Expression.Constant(instance));
        }
    }
}