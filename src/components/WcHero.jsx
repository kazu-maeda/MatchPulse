import { useCountdown } from '../hooks/useCountdown'

const WC_OPEN_FALLBACK = '2026-06-11T18:00:00-05:00'
function pad(n) { return String(n).padStart(2, '0') }

export function WcHero({ kickoff }) {
  const t = useCountdown(kickoff ?? WC_OPEN_FALLBACK)

  return (
    <section className="wc-hero">
      {/* Trophy — 2026の背後に潜む空気感装飾 */}
      <img
        className="wc-hero__trophy-bg"
        src="/images/trophy.png"
        alt=""
        aria-hidden="true"
      />

      <div className="hero-content">

        {/* ── Title ── */}
        <div className="wc-hero__title-block">
          <span className="wc-hero__eyebrow">FIFA World Cup™</span>
          <span className="wc-hero__year">2026</span>
          <p className="wc-hero__tagline">
            Follow every match.<br />Never miss kickoff.
          </p>
          <span className="wc-hero__sub">USA · Canada · Mexico</span>
        </div>

        {/* ── Countdown ── */}
        <div className="wc-hero__countdown-block">
          {t && !t.expired ? (
            <>
              <span className="wc-hero__opens-label">Opens In</span>
              <div className="wc-hero__timer">
                {t.days > 0 && (
                  <>
                    <div className="wc-hero__unit">
                      <span className="wc-hero__num">{pad(t.days)}</span>
                      <span className="wc-hero__unit-lbl">Days</span>
                    </div>
                    <span className="wc-hero__sep">:</span>
                  </>
                )}
                <div className="wc-hero__unit">
                  <span className="wc-hero__num">{pad(t.hours)}</span>
                  <span className="wc-hero__unit-lbl">Hours</span>
                </div>
                <span className="wc-hero__sep">:</span>
                <div className="wc-hero__unit">
                  <span className="wc-hero__num">{pad(t.minutes)}</span>
                  <span className="wc-hero__unit-lbl">Min</span>
                </div>
                <span className="wc-hero__sep">:</span>
                <div className="wc-hero__unit">
                  <span className="wc-hero__num">{pad(t.seconds)}</span>
                  <span className="wc-hero__unit-lbl">Sec</span>
                </div>
              </div>
            </>
          ) : (
            <span className="wc-hero__underway">Now Underway</span>
          )}
        </div>

      </div>
    </section>
  )
}
