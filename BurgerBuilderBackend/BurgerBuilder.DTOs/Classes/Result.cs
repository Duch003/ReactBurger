using System;
using System.Collections.Generic;
using System.Text;

namespace BurgerBuilder.DTOs.Classes
{
    public class Result<T>
    {
        public T Value { get; set; }
        public bool IsFine { get; set; }
        public Exception Exception { get; set; }
        public Result(T value, Exception exception = null)
        {
            Value = value;
            IsFine = exception is null ? true : false;
            Exception = exception;
        }
    }

    public class Result
    {
        public bool IsFine { get; set; }
        public Exception Exception { get; set; }
        public Result(Exception exception = null)
        {
            IsFine = exception is null ? true : false;
            Exception = exception;
        }
    }
}
