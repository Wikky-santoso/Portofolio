const WORKFLOW = ['Received', 'Inspection', 'In progress', 'Ready', 'Invoiced']
const NAV = ['Customers', 'Vehicles', 'Service orders', 'Inventory', 'Invoices', 'Reports']

function WorkshopMockup() {
  return (
    <div className="absolute inset-[6%] grid grid-cols-[28%_1fr] overflow-hidden border border-line bg-night/90 text-[clamp(7px,1.05vw,12px)] shadow-2xl">
      <div className="flex flex-col gap-[0.9em] border-r border-line p-[1.2em]">
        <div className="mb-[0.6em] flex items-center gap-[0.6em] font-display font-semibold tracking-wider uppercase">
          <span className="size-[1.1em] bg-accent" />
          Gala Auto
        </div>
        {NAV.map((item, index) => (
          <div
            key={item}
            className={`px-[0.8em] py-[0.6em] font-display tracking-wide ${index === 2 ? 'bg-accent text-night' : 'text-muted'}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[1.2em] p-[1.4em]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[1.4em] font-semibold">Service orders</span>
          <span className="border border-accent px-[0.9em] py-[0.4em] text-accent uppercase">New</span>
        </div>

        <div className="grid grid-cols-5 gap-[0.4em]">
          {WORKFLOW.map((step, index) => (
            <div key={step} className="flex flex-col gap-[0.5em]">
              <div className={`h-[3px] ${index < 3 ? 'bg-accent' : 'bg-line'}`} />
              <span className={index < 3 ? 'text-ink' : 'text-muted'}>{step}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-[0.6em]">
          {[72, 58, 84, 46].map((width, index) => (
            <div key={index} className="flex items-center gap-[1em] border border-line p-[0.9em]">
              <span className="size-[2.2em] shrink-0 bg-surface" />
              <div className="flex flex-1 flex-col gap-[0.5em]">
                <span className="h-[0.6em] bg-ink/70" style={{ width: `${width}%` }} />
                <span className="h-[0.5em] bg-line" style={{ width: `${width - 24}%` }} />
              </div>
              <span
                className={`px-[0.8em] py-[0.35em] ${index === 0 ? 'bg-accent text-night' : 'border border-line text-muted'}`}
              >
                {index === 0 ? 'Active' : 'Queued'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SLOTS = ['free', 'taken', 'free', 'taken', 'taken', 'free', 'free', 'taken', 'free', 'free', 'taken', 'free']

function ParkingMockup() {
  return (
    <div className="absolute inset-[6%] flex flex-col overflow-hidden border border-line bg-night/90 text-[clamp(7px,1.05vw,12px)] shadow-2xl">
      <div className="flex items-center justify-between border-b border-line px-[1.4em] py-[1em]">
        <span className="font-display font-semibold tracking-wider uppercase">Parking monitor</span>
        <span className="flex items-center gap-[0.6em] text-accent uppercase">
          <span className="size-[0.7em] rounded-full bg-accent" />
          Live
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[1fr_30%]">
        <div className="grid grid-cols-4 gap-[0.7em] p-[1.4em]">
          {SLOTS.map((state, index) => (
            <div
              key={index}
              className={`relative grid place-items-center border ${state === 'free' ? 'border-accent/70 text-accent' : 'border-line bg-surface text-muted'}`}
            >
              <span className="font-display">{`A${index + 1}`}</span>
              <span className="absolute bottom-[0.5em] text-[0.8em] uppercase opacity-70">
                {state === 'free' ? 'Free' : 'Taken'}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[1.2em] border-l border-line p-[1.4em]">
          <span className="text-muted uppercase">Sensor node</span>
          <div className="border border-line p-[1em]">
            <div className="font-display font-semibold">ESP32</div>
            <div className="mt-[0.4em] text-muted">HC-SR04 × per slot</div>
          </div>
          <div className="flex flex-col gap-[0.5em]">
            <span className="text-muted uppercase">Distance</span>
            <div className="relative h-[3px] bg-line">
              <span className="absolute inset-y-0 left-0 w-2/5 bg-accent" />
            </div>
            <span className="text-muted">threshold → occupied</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectVisual({ type, className = '' }) {
  return (
    <div
      className={`relative size-full overflow-hidden bg-surface ${className}`}
      role="img"
      aria-label={
        type === 'workshop'
          ? 'Illustrative mockup of a workshop management dashboard'
          : 'Illustrative mockup of a parking monitoring dashboard'
      }
    >
      <div className="bg-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(184,255,101,0.16),transparent_55%)]"
        aria-hidden="true"
      />
      <div aria-hidden="true" className="absolute inset-0">
        {type === 'workshop' ? <WorkshopMockup /> : <ParkingMockup />}
      </div>
      <span className="absolute right-3 bottom-2 font-display text-[10px] tracking-[0.18em] text-muted uppercase">
        Illustrative mockup
      </span>
    </div>
  )
}
