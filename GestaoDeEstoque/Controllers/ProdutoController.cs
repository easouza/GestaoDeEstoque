using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestaoDeEstoque.Web.Filters;
using GestaoDeEstoque.Data;
using GestaoDeEstoque.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeEstoque.Controllers
{
    [Route("api")]
    public class ProdutoController : Controller
    {
        private readonly ApplicationDatabaseContext _applicationDatabaseContext;

        public ProdutoController(ApplicationDatabaseContext applicationDatabaseContext)
        {
            _applicationDatabaseContext = applicationDatabaseContext;
        }

        [HttpPost("produtos")]
        [ValidateModel]
        public async Task<ActionResult<Produto>> CreateProduto([FromBody] Produto produto)
        {
            _applicationDatabaseContext.Produtos.Add(produto);
            await _applicationDatabaseContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduto), new { id = produto.Id }, produto);
        }

        [HttpGet("produtos")]
        public ActionResult<IEnumerable<Produto>> GetAllProdutos()
        {
            var produtos = _applicationDatabaseContext.Produtos.ToList();
            return Ok(produtos);
        }

        [HttpGet("produtos/{id}")]
        public async Task<IActionResult> GetProduto([FromRoute] long id)
        {
            var result = await _applicationDatabaseContext.Produtos
                .SingleOrDefaultAsync(produto => produto.Id == id);
            return Ok(result);
        }

        [HttpPut("produtos")]
        [ValidateModel]
        public async Task<IActionResult> UpdateProduto([FromBody] Produto produto)
        {
            _applicationDatabaseContext.Update(produto);
            await _applicationDatabaseContext.SaveChangesAsync();
            return Ok(produto);
        }

        [HttpDelete("produtos/{id}")]
        public async Task<IActionResult> DeleteProduto([FromRoute] long id)
        {
            _applicationDatabaseContext.Produtos.Remove(_applicationDatabaseContext.Produtos.Find(id));
            await _applicationDatabaseContext.SaveChangesAsync();
            return Ok();
        }
    }
}
