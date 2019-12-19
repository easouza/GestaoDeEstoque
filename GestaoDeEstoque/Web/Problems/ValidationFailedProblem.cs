using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace GestaoDeEstoque.Web.Rest.Problems
{
    public class ValidationFailedProblem : ProblemDetailsException
    {
        public ValidationFailedProblem(ModelStateDictionary modelState) : base(new ValidationProblemDetails(modelState))
        {
        }
    }
}