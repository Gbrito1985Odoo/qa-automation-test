| Entorno | Web | API | Credenciales |
|---|---|---|---|
| Local | `https://www.saucedemo.com` | `https://restful-booker.herokuapp.com` | `admin`/`password123` |
| CI | idem | idem | desde GitHub secrets |

Los valores sensibles se leen de `.env`; nunca se copian en casos manuales ni en el repositorio.
