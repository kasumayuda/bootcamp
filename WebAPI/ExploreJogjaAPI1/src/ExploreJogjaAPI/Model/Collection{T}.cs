using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExploreJogjaAPI.Model;

namespace ExploreJogjaAPI.Models
{
    public class Collection<T> : Resource
    {
        public T[] Value { get; set; }
    }
}
