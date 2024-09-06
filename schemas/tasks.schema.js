import z from 'zod'

const taskSchema = z.object({
    titulo: z.string({
        invalid_type_error: ({ path }) => `${path} debe ser un texto`,
        required_error: ({ path }) => `${path} es obligatorio`
    }),
    descripcion: z.string().optional(),
    fecha_creacion: z.date({
        invalid_type_error: ({ path }) => `${path} debe ser una fecha válida`,
        required_error: ({ path }) => `${path} es obligatorio`
    }),
    fecha_vencimiento: z.date({
        invalid_type_error: ({ path }) => `${path} debe ser una fecha válida`,
        required_error: ({ path }) => `${path} es obligatorio`
    }),
    estado: z.enum(['pendiente', 'en progreso', 'completado']).optional()
});

export function validateTask(input) {
    return taskSchema.safeParse(input);
}