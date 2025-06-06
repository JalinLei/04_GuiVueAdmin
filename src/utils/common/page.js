import { fmtTitle } from '@/utils/common/fmtRouterTitle'

export default function getPageTitle(pageTitle, route, appName) {
    if (pageTitle) {
        const title = fmtTitle(pageTitle, route)
        return `${title} - ${appName}`
    }
    return `${appName}`
}
