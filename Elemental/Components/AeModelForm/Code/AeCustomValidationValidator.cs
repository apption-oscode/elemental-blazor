using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.Extensions.Logging;

// ReSharper disable once CheckNamespace
namespace Elemental.Components;

public class AeCustomValidationValidator<T> : ComponentBase
{
    [CascadingParameter] 
    public EditContext? EditContext { get; set; }
    
    [Parameter]
    public ModelFormContext<T>? ModelFormContext { get; set; }
    
    [Parameter]
    public T? Model { get; set; }
    
    private ValidationMessageStore? _messageStore;

    [Inject] private ILogger<AeCustomValidationValidator<T>>? Logger { get; set; }

    protected override void OnInitialized()
    {
        base.OnInitialized();

        if (EditContext is null || ModelFormContext is null)
            throw new NullReferenceException(
                $"{nameof(AeCustomValidationValidator<T>)} must be placed within an {nameof(AeModelForm<T>)}");

        if(Model is null)
            throw new NullReferenceException(
                $"Model must be set on {nameof(AeCustomValidationValidator<T>)}");
        
        _messageStore = new ValidationMessageStore(EditContext);
        EditContext.OnValidationRequested += (_, _) => _messageStore?.Clear();
        EditContext.OnFieldChanged += (_, e) => _messageStore?.Clear(e.FieldIdentifier);
    }

    public void DisplayErrors(Dictionary<string, List<string>> errors)
    {
        if (EditContext is null) 
            return;
        
        foreach (var (key, value) in errors)
        {
            _messageStore?.Add(EditContext.Field(key), value);
        }
        EditContext.NotifyValidationStateChanged();
    }

    public void ClearErrors()
    {
        _messageStore?.Clear();
        EditContext?.NotifyValidationStateChanged();
    }

    public bool Validate()
    {
        if (ModelFormContext is null || Model is null)
        {
            Logger?.LogError("ModelFormContext or Model is null");
            return false;
        }
        
        ClearErrors();
        
        var errors = ModelFormContext.Validate(Model);
        if (errors.Any())
        {
            DisplayErrors(errors);
            return false;
        }
        return true;
    }

   
}