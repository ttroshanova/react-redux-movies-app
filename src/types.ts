import {store} from './app/store'
import {z} from 'zod'

export const dataSchema = z.object({
    Search: z.array(z.object({
        Title: z.string(),
        Year: z.string(),
        imdbID: z.string(),
        Type: z.string(),
        Poster: z.string(),
    }))
})

export const movieOrShowDataSchema = z.object({
    Actors: z.string(),
    Awards: z.string(),
    Country: z.string(),
    Director: z.string(),
    Genre: z.string(),
    Plot: z.string(),
    Poster: z.string(),
    Ratings: z.array(z.object({
        Value: z.string()
    })),
    Title: z.string(),
    Type: z.string(),
    Writer: z.string(),
    Year: z.string()
})

export type SearchData = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#^]{8,}$/)

export const formSignInSchema = z.object({
    email: z.string().min(1, {message: 'Email is required'}).email({message: 'Invalid email'}),
    password: z.string().min(8, {message: 'Password must contain at least 8 characters'}).regex(passwordPattern, {
    message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
  })
})

export const formHomeSchema = z.object({
    email: z.string().min(1, {message: 'Email is required'}).email({message: 'Invalid email'})
  })

export type TFormSchema = z.infer<typeof formSignInSchema>
export type TFormHomeSchema = z.infer<typeof formHomeSchema>

export type TmovieOrShowDataSchema = z.infer<typeof movieOrShowDataSchema>

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;