export const useStyleCombing = (...props: string[]) => props.map( style => style.trim() ).join( " " );