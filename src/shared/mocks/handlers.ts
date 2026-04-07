import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/v1/init', () => {
    return HttpResponse.json({
      site_name: 'Амбасада за урбанизм',
      seo_description: 'Сообщество архитекторов и урбанистов',
      languages: [{ code: 'ru', label: 'Русский' }],
      socials: [
        { type: 'telegram', url: 'https://t.me/example' },
        { type: 'instagram', url: 'https://instagram.com/example' },
      ],
      copyright: '© 2026 Амбасада за урбанизм',
    })
  }),
]