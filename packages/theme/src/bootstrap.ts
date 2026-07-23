import { applyTheme, resolveTheme } from './manager'

/** Applies the persisted or system theme before React mounts to prevent a color flash. */
export function bootstrapTheme(): void {
  applyTheme(resolveTheme())
}
