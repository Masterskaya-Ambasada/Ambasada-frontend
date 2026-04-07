import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/v1/init', () => {
    return HttpResponse.json({
      site_name: 'Амбасада за урбанизм',
      seo_description: 'string',
      languages: [{ code: 'ru', label: 'Русский' }],
      socials: [],
      copyright: '© 2026 Амбасада за урбанизм',
    })
  }),
]