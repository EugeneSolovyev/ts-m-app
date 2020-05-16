import { capitalize } from '../helpers/strings'

export class AllowedType {
    public title: string

    constructor(public id: string) {
        this.title = capitalize(id)
    }
}

export const ALLOWED_AUDIO_TYPES: AllowedType[] = [
    new AllowedType('music'),
    new AllowedType('book'),
    new AllowedType('podcast'),
]
