const yearFilter = new Date().getFullYear() - 2;

export const DEFAULT_QUERY = `fecha_del_parte > date'${yearFilter}'`

export const EMPTY_SELECT = { label: "Select...", value: "" }

