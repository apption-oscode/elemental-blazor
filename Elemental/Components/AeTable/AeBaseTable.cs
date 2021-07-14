using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using Elemental.Code;
using System.Text;
using System.Reflection;

namespace Elemental.Components
{
  public class AeBaseTable<T> : HtmlElement
  {
    [Parameter] public List<string> Headers { get; set; } = new List<string>();
    [Parameter] public List<T> Dataset { get; set; }
    [Parameter] public List<Func<T, string>> Accessors { get; set; }
    [Parameter] public string GridTemplateColumns { get; set; }
    [Parameter] public List<Func<T, RenderFragment>> Renderers { get; set; }
    [Parameter] public EventCallback<T> OnRowClick { get; set; }
    [Parameter] public EventCallback<T> OnRowFocus { get; set; }
    [Parameter] public Func<string, int, RenderFragment> CustomHeader { get; set; }

    protected IEnumerable<T> Rows { get => GetSortedDataset(); }
    protected (int column, bool sortAscending) _sorting = (0, true);


    protected string _tableClass => $"ae table {_inputClass}";
    protected string _gridStyle => $"grid-template-columns: {CalculateGridTemplateColumns()};";


    protected override void OnInitialized()
    {
        base.OnInitialized();
    }

    protected virtual IEnumerable<T> GetSortedDataset()
    {
      if (Dataset is null || !Dataset.Any())
      {
        return new List<T>();
      }

      if (_sorting.sortAscending)
      {
        return Dataset.OrderBy(data => Accessors[_sorting.column].Invoke(data));
      }
      else
      {
        return Dataset.OrderByDescending(data => Accessors[_sorting.column].Invoke(data));
      }
    }

    protected virtual string CalculateGridTemplateColumns()
    {
      if(string.IsNullOrWhiteSpace(GridTemplateColumns)){
        return $"repeat({(Accessors?.Count ?? 1)}, 1fr)";
      }

      return GridTemplateColumns;
    }

    protected virtual void ToggleSortOnColumn(int column)
    {
        if (column == _sorting.column)
        {
            _sorting.sortAscending = !_sorting.sortAscending;
        }
        else
        {
            _sorting.column = column;
            _sorting.sortAscending = true;
        }
        StateHasChanged();
    }

    protected virtual string GetSortIconClass(int column)
    {
        if (column == _sorting.column)
        {
            return _sorting.sortAscending ? "fad fa-sort-down" : "fad fa-sort-up";
        }
        return "fad fa-sort";
    }

    // It's not recommended to use the RenderFragment builder yet so this is a catch-all workaround
    protected virtual RenderFragment DefaultHeader(string header, int index){
      throw new NotImplementedException("You must implement the DefaultHeader method for your Table Component.");
    }

    protected virtual byte[] ExportToCSVInByte()
    {
        var builder = new StringBuilder();
        (int column, bool sortAscending) _sorting = (0, true);

        foreach (var h in Headers)
        {
            builder.Append(h + ",");
        }
        //Remove the last ,
        builder.Length--;
        builder.Append(Environment.NewLine);

        foreach (var row in Dataset.OrderByDescending(data => Accessors[_sorting.column].Invoke(data)))
        {

            foreach (var (accessor, index) in Accessors.Select((a, i) => (a, i)))
            {
                var value = accessor?.Invoke(row);
                if (value.IndexOfAny(new char[] { '"', ',' }) != -1)
                {
                    builder.AppendFormat("\"{0}\"", value.Replace("\"", "\"\""));
                    builder.Append(",");
                }
                else
                {
                    builder.Append(accessor?.Invoke(row) + ",");
                }
            }
            //Remove the last ,
            builder.Length--;
            builder.Append(Environment.NewLine);
        }
        var bytes = Encoding.UTF8.GetBytes(builder.ToString());
        return bytes;
    }
  }
}
