export interface Game{
    map(arg0: ({ name, votos }: { name: any; votos: any; }) => { name: any; value: any; }): any;
    id: string;
    name: string;
    url: string;
    votos: number;
}