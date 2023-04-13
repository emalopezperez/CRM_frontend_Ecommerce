import { useFormik } from "formik"
import * as Yup from "yup"

const CrearColaborador = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      cargo: 'administrador',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      apellido: Yup.string().required('El apellido es obligatorio'),
      email: Yup.string().email('El email es obligatorio').required('El email es obligatorio'),
      password: Yup.string().required('El password es obligatorio').min(6, "El pasword debe contener al menos 6 caracteres")
    }),
    onSubmit: async (values) => {
      const apiUrl = "http://localhost:3001/api/"
      const token = localStorage.getItem('token')
  
      let data = {
        email: values.email,
        nombre: values.nombre,
        apellido: values.apellido,
        rol: values.cargo
      }
  
      await fetch(`${apiUrl}registro_colaborador_admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });
    }
  });
  

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full h-[90vh] m-auto mx-auto overflow-scroll text-white shadow-md shadow-white rounded-xl lg:p-4 ">
        <div className="">
          <span className="flex justify-center text-sm text-gray-300">Colaboradores</span>
          <h2 className="flex justify-center my-4 font-sans text-2xl font-bold text-black">Nuevo colaborador</h2>
          <div className="flex justify-center ">
            <div className="w-full max-w-lg ">
              <form
                className="px-8 pt-6 pb-8 mb-4 rounded shadow-md"
                onSubmit={ formik.handleSubmit }
              >
                <div className="grid w-full gap-4 py-2 mt-6 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label
                      className="block mb-2 text-sm text-gray-500"
                      htmlFor="nombre"
                    >Nombre</label>
                    <input
                      type="text"
                      className="flex w-full p-3 px-3 py-2 leading-tight text-black border-2 border-gray-300 rounded-lg shadow outline-none appearance-none focus:outline-none focus:shadow-outline"
                      id="nombre"
                      placeholder="Nombre de Usuario"
                      value={ formik.values.nombre }
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                    />

                    { formik.touched.nombre && formik.errors.nombre ?
                      <div className="mt-2 text-red-600">
                        <p className="text-sm">{ formik.errors.nombre }</p>
                      </div>
                      : null
                    }
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm text-gray-500"
                      htmlFor="email"
                    >Apellido</label>
                    <input
                      type="apellido"
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="apellido"
                      placeholder="Apellido de Usuario"
                      value={ formik.values.apellido }
                      onChange={ formik.handleChange }
                      onBlur={ formik.handleBlur }
                    />

                    { formik.touched.apellido && formik.errors.apellido ?
                      <div className="mt-2 text-red-600">
                        <p className="text-sm">{ formik.errors.apellido }</p>
                      </div>
                      : null
                    }
                  </div>
                </div>


                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm text-gray-500"
                    htmlFor="email"
                  >Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Email de Usuario"
                    value={ formik.values.email }
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                  />

                  { formik.touched.email && formik.errors.email ?
                    <div className="mt-2 text-red-600">
                      <p className="text-sm">{ formik.errors.email }</p>
                    </div>
                    : null
                  }
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm text-gray-500"
                    htmlFor="password"
                  >Password</label>
                  <input
                    type="password"
                    className="flex w-full p-3 px-3 py-2 leading-tight text-black border-2 border-gray-300 rounded-lg shadow outline-none appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="Password de Usuario"
                    value={ formik.values.password }
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                  />

                  { formik.touched.password && formik.errors.password ?
                    <div className="mt-2 text-red-600">
                      <p className="text-sm">{ formik.errors.password }</p>
                    </div>
                    : null
                  }
                </div>
                <label htmlFor="cargo" className="block mb-2 text-sm font-bold text-gray-700">
                  Cargo
                </label>
                <select
                  className="flex w-full p-3 px-3 py-2 mb-3 leading-tight text-black border-2 border-gray-300 rounded-lg shadow outline-none"
                  name="cargo"
                  value={ formik.values.cargo }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                >
                  <option value="administrador">Administrador</option>
                  <option value="colaborador">Colaborador</option>
                </select>


                <input
                  type="submit"
                  className="w-full p-2 text-white bg-orange-600 cursor-pointer hover:bg-orange-400"
                  value="Crear colaborador"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrearColaborador