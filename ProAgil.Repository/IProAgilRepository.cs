using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
        Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes);
        Task<Evento> GetEventoAsyncById(int eventoId, bool includePalestrantes);
        Task<Palestrante[]> GetAllPalestrante(bool includeEvento);
        Task<Palestrante> GetPalestranteAsyncById(int palestranteId, bool includeEvento);
        Task<Palestrante[]> GetPalestranteAsyncByName(string palestranteNome, bool includeEvento);
    }
}