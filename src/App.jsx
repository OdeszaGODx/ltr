import { useEffect, useRef, useState } from 'react'

const startDate = new Date('2026-04-02T00:00:00')
const nextMeeting = new Date('2026-08-01T18:00:00')

const vientiane = { lat: 17.9667, lng: 102.6 }
const chiangMai = { lat: 18.7883, lng: 98.9853 }

function getDaysTogether() {
  const now = new Date()
  const diff = Math.max(0, now - startDate)
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function getDistanceKm() {
  const toRad = (value) => (value * Math.PI) / 180
  const earthRadiusKm = 6371
  const dLat = toRad(chiangMai.lat - vientiane.lat)
  const dLng = toRad(chiangMai.lng - vientiane.lng)
  const lat1 = toRad(vientiane.lat)
  const lat2 = toRad(chiangMai.lat)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(earthRadiusKm * c)
}

const distanceKm = getDistanceKm()

const strings = {
  en: {
    badge: 'For you',
    title: 'To the one I love',
    subtitle: 'Even when we are far apart, thinking of you makes me feel close.',
    daysTogether: 'days together',
    distance: 'km between us',
    nextMeeting: 'Until the next meeting',
    mapTitle: 'Us apart, together in heart',
    mapLeft: 'Vientiane',
    mapRight: 'Chiang Mai',
    musicTitle: 'Our playlist',
    musicDescription: 'Play the mood music and let it loop while you browse.',
    play: 'Play music',
    stop: 'Stop music',
    memoriesTitle: 'Our cherished moments',
    galleryTitle: 'Memory notes',
    letterTitle: 'Write to me anytime',
    letterDescription: "Whenever something is on your mind, write it here — it flies straight to my phone, wherever I am.",
    placeholder: 'I miss you...',
    loveTitle: 'I love you',
    loveDescription: 'You are always in my thoughts, even when the phone is quiet.',
    languageLabel: 'Language',
    sendButton: 'Send to Telegram',
    sending: 'Sending...',
    sent: 'Sent!',
    sendError: 'Something went wrong, please try again',
    reasonsTitle: '50 reasons I love you',
    reasonsSubtitle: 'Tap the card to reveal one reason at a time.',
    reasonsPrompt: 'Tap to reveal a reason',
    reasonsNext: 'Another reason',
    secretMessage: 'I just love you ❤',
  },
  th: {
    badge: 'สำหรับคุณ',
    title: 'ถึงคนที่รักที่สุด',
    subtitle: 'แม้ระยะทางจะไกล แค่คิดถึงก็เหมือนเราอยู่ใกล้กันเสมอ.',
    daysTogether: 'วันที่เราอยู่ด้วยกัน',
    distance: 'กิโลเมตรระหว่างเรา',
    nextMeeting: 'ถึงการพบกันครั้งต่อไป',
    mapTitle: 'ระหว่างที่เราอยู่ต่างที่',
    mapLeft: 'เวียงจันทน์',
    mapRight: 'เชียงใหม่',
    musicTitle: 'เพลงของเรา',
    musicDescription: 'กดเล่นเพลงบรรยากาศ แล้วปล่อยให้วนไปเรื่อย ๆ ขณะดูเว็บนี้ได้.',
    play: 'เล่นเพลง',
    stop: 'หยุดเพลง',
    memoriesTitle: 'ช่วงเวลาที่รักของเรา',
    galleryTitle: 'ภาพความทรงจำ',
    letterTitle: 'เขียนถึงผมได้ทุกเมื่อ',
    letterDescription: 'ไม่ว่าจะอยากบอกอะไรผมตอนไหน เขียนไว้ตรงนี้ได้เลย ข้อความจะส่งตรงถึงมือถือผมทันที ไม่ว่าผมจะอยู่ที่ไหน',
    placeholder: 'ผมคิดถึงคุณ...',
    loveTitle: 'ผมรักคุณ',
    loveDescription: 'คุณอยู่ในความคิดของผมเสมอ แม้สายโทรศัพท์จะเงียบ.',
    languageLabel: 'ภาษา',
    sendButton: 'ส่งไปยัง Telegram',
    sending: 'กำลังส่ง...',
    sent: 'ส่งเรียบร้อย!',
    sendError: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
    reasonsTitle: '50 เหตุผลที่ผมรักคุณ',
    reasonsSubtitle: 'แตะที่การ์ดเพื่อดูเหตุผลทีละข้อ',
    reasonsPrompt: 'แตะเพื่อดูเหตุผล',
    reasonsNext: 'อีกเหตุผลหนึ่ง',
    secretMessage: 'ผมแค่รักคุณ ❤',
  },
}

const tracks = [
  {
    title: { en: 'After the Storm', th: 'หลังพายุ' },
    description: {
      en: 'A calm track that feels like peace after the hard days.',
      th: 'เพลงที่ให้ความรู้สึกสงบหลังจากวันที่เหนื่อยล้า',
    },
    file: 'after_the_storm.mp3',
  },
  {
    title: { en: 'Memory Ritual', th: 'พิธีความทรงจำ' },
    description: {
      en: 'A soft and reflective piece for tender memories.',
      th: 'เพลงอ่อน ๆ และสะท้อนความทรงจำที่อ่อนโยน',
    },
    file: 'memory_ritual.mp3',
  },
  {
    title: { en: 'Our Gentle Evening', th: 'ค่ำคืนอันอ่อนโยน' },
    description: {
      en: 'Warm and gentle, like a quiet evening together.',
      th: 'อบอุ่นและนุ่มนวล เหมือนคืนเงียบ ๆ ที่อยู่ด้วยกัน',
    },
    file: 'menu_theme.mp3',
  },
]

const memories = [
  {
    title: { en: 'First Message', th: 'ข้อความแรก' },
    caption: {
      en: 'It started with a hello that made my heart race.',
      th: 'เริ่มต้นจากคำทักทายที่ทำให้หัวใจเต้น',
    },
  },
  {
    title: { en: 'Video Call', th: 'วิดีโอคอล' },
    caption: {
      en: 'Seeing you from afar felt closer than ever.',
      th: 'เห็นหน้าแม้จะต่างที่ แต่รู้สึกใกล้กัน',
    },
  },
  {
    title: { en: 'Counting Days', th: 'เริ่มนับวัน' },
    caption: {
      en: 'The days we keep close in our hearts.',
      th: 'วันที่เราเก็บไว้ในหัวใจ',
    },
    photo: '/photos/hands.jpg',
  },
]

const events = [
  {
    date: '30 มีนาคม 2026',
    title: { en: 'First message', th: 'ข้อความแรก' },
    description: {
      en: 'The first note, the first feeling, and the sense that it was special.',
      th: 'ข้อความแรก ความรู้สึกแรก และความรู้สึกว่านี่คือเรื่องพิเศษ.',
    },
  },
  {
    date: '29 พฤษภาคม 2026',
    title: { en: 'First video call', th: 'วิดีโอคอลครั้งแรก' },
    description: {
      en: 'My heart raced when I saw you on screen.',
      th: 'หัวใจเต้นแรงเมื่อเห็นคุณผ่านหน้าจอ.',
    },
  },
  {
    date: '2 เมษายน 2026',
    title: { en: 'Started dating', th: 'เริ่มออกเดต' },
    description: {
      en: 'The day our story became something real and beautiful.',
      th: 'วันที่เรื่องราวของเราเริ่มเป็นจริงและสวยงาม.',
    },
  },
]

const reasons = [
  { en: 'I love it when you smile', th: 'ผมชอบเวลาที่คุณยิ้ม' },
  { en: "Because you're the best there is", th: 'เพราะคุณคือคนที่ดีที่สุด' },
  { en: "I love how you laugh when you try to hold it in and just can't", th: 'ผมชอบเวลาที่คุณพยายามกลั้นหัวเราะแต่กลั้นไม่อยู่' },
  { en: "For how you listen, even when I haven't figured out what I'm trying to say yet", th: 'เพราะคุณรับฟังผม แม้ตอนที่ผมเองยังไม่รู้ว่าจะพูดอะไร' },
  { en: 'For your patience', th: 'เพราะความอดทนของคุณ' },
  { en: 'For making me feel at home with you, wherever we are', th: 'เพราะไม่ว่าจะอยู่ที่ไหน อยู่กับคุณก็รู้สึกเหมือนอยู่บ้าน' },
  { en: "I love how you squint when you're concentrating", th: 'ผมชอบเวลาที่คุณหรี่ตาตอนตั้งใจทำอะไรบางอย่าง' },
  { en: "For your honesty, even when it's uncomfortable", th: 'เพราะความจริงใจของคุณ แม้ในเรื่องที่พูดยาก' },
  { en: 'For believing in me more than I sometimes believe in myself', th: 'เพราะบางครั้งคุณเชื่อในตัวผม มากกว่าที่ผมเชื่อในตัวเอง' },
  { en: 'I love our quiet mornings together', th: 'ผมชอบเช้าวันที่เงียบสงบที่เราอยู่ด้วยกัน' },
  { en: 'For how you take care of the people around you', th: 'เพราะวิธีที่คุณดูแลคนรอบตัว' },
  { en: 'For your curiosity about everything new', th: 'เพราะความอยากรู้อยากเห็นของคุณต่อสิ่งใหม่ ๆ' },
  { en: 'I love how your voice sounds when you talk about the things you love', th: 'ผมชอบน้ำเสียงของคุณเวลาพูดถึงสิ่งที่คุณรัก' },
  { en: 'For your courage to try the unfamiliar', th: 'เพราะความกล้าของคุณที่จะลองสิ่งที่ไม่คุ้นเคย' },
  { en: 'For making it safe to be vulnerable with you', th: 'เพราะอยู่กับคุณแล้วผมกล้าเปิดใจ ไม่ต้องกลัว' },
  { en: 'I love how you hold my hand', th: 'ผมชอบเวลาที่คุณจับมือผม' },
  { en: 'For your sense of humor', th: 'เพราะอารมณ์ขันของคุณ' },
  { en: 'For turning an ordinary day into something special', th: 'เพราะคุณทำให้วันธรรมดากลายเป็นวันพิเศษ' },
  { en: 'I love the way you get amazed by simple things', th: 'ผมชอบเวลาที่คุณตื่นเต้นกับเรื่องเล็ก ๆ น้อย ๆ' },
  { en: 'For your care for the little details', th: 'เพราะความใส่ใจในรายละเอียดเล็ก ๆ ของคุณ' },
  { en: 'For never being afraid to tell me the truth', th: 'เพราะคุณไม่กลัวที่จะพูดความจริงกับผม' },
  { en: 'I love how you look right after waking up', th: 'ผมชอบหน้าคุณตอนเพิ่งตื่นนอน' },
  { en: 'For your inner strength', th: 'เพราะความเข้มแข็งภายในของคุณ' },
  { en: 'For making me a better person just by being near you', th: 'เพราะแค่อยู่ใกล้คุณ ผมก็กลายเป็นคนที่ดีขึ้น' },
  { en: 'I love how happy the little things make you', th: 'ผมชอบเวลาที่คุณมีความสุขกับเรื่องเล็ก ๆ' },
  { en: 'For your loyalty', th: 'เพราะความซื่อสัตย์ของคุณ' },
  { en: 'For your ability to forgive', th: 'เพราะความสามารถในการให้อภัยของคุณ' },
  { en: 'I love how we can be silent together without it ever feeling awkward', th: 'ผมชอบที่เราเงียบด้วยกันได้ โดยไม่รู้สึกอึดอัด' },
  { en: 'For your ability to see the good in people', th: 'เพราะคุณมองเห็นด้านดีของคนอื่นเสมอ' },
  { en: 'For remembering the little things that matter to me', th: 'เพราะคุณจำเรื่องเล็ก ๆ ที่สำคัญกับผมได้เสมอ' },
  { en: "I love your energy when you're passionate about something", th: 'ผมชอบพลังของคุณเวลาที่หลงใหลในอะไรสักอย่าง' },
  { en: 'For your tenderness', th: 'เพราะความอ่อนโยนของคุณ' },
  { en: 'For never giving up', th: 'เพราะคุณไม่เคยยอมแพ้' },
  { en: 'I love how you take care of me, even without saying it out loud', th: 'ผมชอบที่คุณดูแลผม แม้จะไม่ได้พูดออกมา' },
  { en: 'For your wisdom', th: 'เพราะความฉลาดรอบคอบของคุณ' },
  { en: 'For making even the most ordinary moments interesting', th: 'เพราะคุณทำให้แม้แต่ช่วงเวลาธรรมดาก็น่าสนใจ' },
  { en: "I love how you dance when you think no one's watching", th: 'ผมชอบเวลาที่คุณเต้นตอนคิดว่าไม่มีใครมอง' },
  { en: 'For your patience with my quirks', th: 'เพราะความอดทนของคุณต่อความแปลกของผม' },
  { en: "For celebrating my wins like they're your own", th: 'เพราะคุณดีใจกับความสำเร็จของผม เหมือนมันเป็นของคุณเอง' },
  { en: 'I love your smile when you see something funny', th: 'ผมชอบรอยยิ้มของคุณเวลาเจอเรื่องตลก' },
  { en: 'For your sincerity', th: 'เพราะความจริงใจของคุณ' },
  { en: 'For making the future feel inspiring instead of scary', th: 'เพราะอยู่กับคุณแล้วอนาคตดูน่าตื่นเต้น ไม่น่ากลัว' },
  { en: 'I love how you care for your family', th: 'ผมชอบวิธีที่คุณดูแลครอบครัวของคุณ' },
  { en: 'For your ability to surprise me again and again', th: 'เพราะคุณทำให้ผมประหลาดใจได้ครั้งแล้วครั้งเล่า' },
  { en: 'For staying true to yourself in any situation', th: 'เพราะคุณเป็นตัวเองเสมอไม่ว่าจะอยู่ในสถานการณ์ไหน' },
  { en: 'I love our quiet evenings together', th: 'ผมชอบค่ำคืนเงียบ ๆ ที่เราอยู่ด้วยกัน' },
  { en: 'For your kind heart', th: 'เพราะหัวใจที่ดีของคุณ' },
  { en: 'For choosing me', th: 'เพราะคุณเลือกผม' },
  { en: "I love who I become when I'm with you", th: 'ผมชอบตัวเองในเวอร์ชันที่ดีขึ้น เวลาอยู่กับคุณ' },
  { en: 'Because I love you — just because, for no reason at all, and for every reason at once', th: 'เพราะผมรักคุณ — แค่นั้นแหละ ไม่มีเหตุผล และก็มีทุกเหตุผลในเวลาเดียวกัน' },
]

function formatTwo(value) {
  return String(value).padStart(2, '0')
}

function getCountdown() {
  const now = new Date()
  const diff = Math.max(0, nextMeeting - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export default function App() {
  const [countdown, setCountdown] = useState(getCountdown())
  const [note, setNote] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [language, setLanguage] = useState('th')
  const [daysTogether, setDaysTogether] = useState(getDaysTogether())
  const [isSending, setIsSending] = useState(false)
  const [sendStatus, setSendStatus] = useState('')
  const [reasonIndex, setReasonIndex] = useState(null)
  const [showSecret, setShowSecret] = useState(false)

  const audioRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setDaysTogether(getDaysTogether()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      const nextIndex = (currentTrack + 1) % tracks.length
      setCurrentTrack(nextIndex)
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!isPlaying) {
      audio.pause()
      return
    }

    audio.src = `/audio/${tracks[currentTrack].file}`
    audio.load()
    audio.currentTime = 0
    const playPromise = audio.play()
    if (playPromise) {
      playPromise.catch(() => setIsPlaying(false))
    }
  }, [currentTrack, isPlaying])

  const handleToggleAudio = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    setCurrentTrack(0)
    setIsPlaying(true)
  }

  const handleSendMessage = async () => {
    if (!note.trim()) return

    setIsSending(true)
    setSendStatus('')

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: note }),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (response.ok) {
        setSendStatus('sent')
        setNote('')
        setTimeout(() => setSendStatus(''), 3000)
      } else {
        console.error('Send failed:', response.status, response.statusText)
        setSendStatus('error')
        setTimeout(() => setSendStatus(''), 3000)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSendStatus('error')
      setTimeout(() => setSendStatus(''), 3000)
    } finally {
      setIsSending(false)
    }
  }

  const pickReason = () => {
    let index
    do {
      index = Math.floor(Math.random() * reasons.length)
    } while (index === reasonIndex && reasons.length > 1)
    setReasonIndex(index)
  }

  const t = strings[language]

  return (
    <div className="page-shell">
      <div className="background-hearts" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className={`heart-bubble heart-bubble-${index + 1}`}>❤</span>
        ))}
      </div>

      <div className="hero-card">
        <div className="hero-top-row">
          <span className="badge">{t.badge}</span>
          <div className="language-switch">
            <span>{t.languageLabel}:</span>
            <button type="button" onClick={() => setLanguage('th')} className={language === 'th' ? 'active-lang' : ''}>
              ไทย
            </button>
            <button type="button" onClick={() => setLanguage('en')} className={language === 'en' ? 'active-lang' : ''}>
              EN
            </button>
          </div>
        </div>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div className="hero-footer">
          <div>
            <strong>{daysTogether}</strong>
            <span>{t.daysTogether}</span>
          </div>
          <div>
            <strong>{distanceKm}</strong>
            <span>{t.distance}</span>
          </div>
        </div>
      </div>

      <section className="stats-grid">
        <article className="stat-card soft">
          <h2>{t.mapTitle}</h2>
          <div className="map-card">
            <div className="pin pin-left">{t.mapLeft}</div>
            <div className="pin pin-right">{t.mapRight}</div>
            <div className="line" />
          </div>
        </article>
      </section>

      <section className="music-section">
        <div className="music-card">
          <audio ref={audioRef} preload="auto" />
          <div className="music-header">
            <div>
              <h2>{t.musicTitle}</h2>
              <p>{t.musicDescription}</p>
            </div>
            <button onClick={handleToggleAudio} className="play-button">
              {isPlaying ? t.stop : t.play}
            </button>
          </div>
          <div className="playlist-grid">
            {tracks.map((track, index) => (
              <button
                key={track.title.en}
                type="button"
                className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTrack(index)
                  setIsPlaying(true)
                }}
              >
                <strong>{track.title[language]}</strong>
                <p>{track.description[language]}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <h2>{t.memoriesTitle}</h2>
        <div className="timeline">
          {events.map((event) => (
            <div className="timeline-item" key={event.date}>
              <span className="timeline-date">{event.date}</span>
              <h3>{event.title[language]}</h3>
              <p>{event.description[language]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <h2>{t.galleryTitle}</h2>
        <div className="gallery-grid">
          {memories.map((memory) => (
            <div key={memory.title.en} className={`gallery-card ${memory.photo ? 'has-photo' : ''}`}>
              {memory.photo && (
                <div className="gallery-photo">
                  <img src={memory.photo} alt={memory.title[language]} loading="lazy" />
                </div>
              )}
              <h3>{memory.title[language]}</h3>
              <p>{memory.caption[language]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reasons-section">
        <h2>{t.reasonsTitle}</h2>
        <p>{t.reasonsSubtitle}</p>
        <div className="reason-card-wrap">
          <div
            className={`reason-card ${reasonIndex !== null ? 'flipped' : ''}`}
            onClick={() => reasonIndex === null && pickReason()}
          >
            <div className="reason-card-inner">
              <div className="reason-card-face reason-card-front">
                <span className="reason-card-heart">❤</span>
                <p>{t.reasonsPrompt}</p>
              </div>
              <div className="reason-card-face reason-card-back">
                <p key={reasonIndex}>{reasonIndex !== null ? reasons[reasonIndex][language] : ''}</p>
              </div>
            </div>
          </div>
        </div>
        {reasonIndex !== null && (
          <button type="button" className="reason-next-button" onClick={pickReason}>
            {t.reasonsNext}
          </button>
        )}
      </section>

      <section className="note-section">
        <div className="note-card">
          <h2>{t.letterTitle}</h2>
          <p>{t.letterDescription}</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t.placeholder}
            disabled={isSending}
          />
          <button
            onClick={handleSendMessage}
            disabled={isSending || !note.trim()}
            className="send-button"
          >
            {isSending ? t.sending : t.sendButton}
          </button>
          {sendStatus === 'sent' && <div className="send-feedback send-success">{t.sent}</div>}
          {sendStatus === 'error' && <div className="send-feedback send-error">{t.sendError}</div>}
        </div>
        <div className="love-card">
          <h2>{t.loveTitle}</h2>
          <p>{t.loveDescription}</p>
          <div className="love-photo">
            <img src="/photos/bouquet.jpg" alt={t.loveTitle} loading="lazy" />
            <span className="love-photo-heart">❤</span>
          </div>
        </div>
      </section>

      <button
        type="button"
        className="secret-heart-button"
        aria-label="secret"
        onClick={() => setShowSecret(true)}
      >
        ❤
      </button>

      {showSecret && (
        <div className="secret-overlay" onClick={() => setShowSecret(false)}>
          <div className="secret-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="secret-close"
              aria-label="close"
              onClick={() => setShowSecret(false)}
            >
              ×
            </button>
            <div className="secret-hearts" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={index} className={`secret-float-heart sfh-${index + 1}`}>❤</span>
              ))}
            </div>
            <p className="secret-message">{t.secretMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}
