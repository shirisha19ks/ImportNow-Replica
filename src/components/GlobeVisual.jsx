import { useEffect, useRef } from "react";

const CITIES = [
  { name: "Shanghai", lat: 31.2, lon: 121.47, flag: "cn" },
  { name: "Yiwu", lat: 29.3, lon: 120.07, flag: "cn" },
  { name: "Nhava Sheva", lat: 18.95, lon: 72.95, flag: "in" },
  { name: "Hyderabad", lat: 17.39, lon: 78.49, flag: "in" },
  { name: "Chennai", lat: 13.08, lon: 80.27, flag: "in" },
];

const ARCS = [
  [
    [31.2, 121.47],
    [18.95, 72.95],
  ],
  [
    [29.3, 120.07],
    [17.39, 78.49],
  ],
  [
    [23.13, 113.26],
    [13.08, 80.27],
  ],
];

const CENTER = { lat: 22, lon: 92 };

function deg(value) {
  return (value * Math.PI) / 180;
}

function toVector(lat, lon) {
  const phi = deg(lat);
  const lambda = deg(lon);
  return [Math.cos(phi) * Math.cos(lambda), Math.sin(phi), Math.cos(phi) * Math.sin(lambda)];
}

function rotateToCamera(vector) {
  const [x, y, z] = vector;
  const yaw = deg(CENTER.lon - 90);
  const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
  const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const pitch = deg(CENTER.lat);
  const y2 = y * Math.cos(pitch) - z1 * Math.sin(pitch);
  const z2 = y * Math.sin(pitch) + z1 * Math.cos(pitch);
  return { x: x1, y: y2, z: z2 };
}

function project(lat, lon, radius) {
  const point = rotateToCamera(toVector(lat, lon));
  return {
    x: point.x * radius,
    y: -point.y * radius,
    visible: point.z > 0.08,
    z: point.z,
  };
}

function Flag({ code }) {
  if (code === "cn") {
    return (
      <svg viewBox="0 0 20 14" className="h-2.5 w-3.5 rounded-[2px] shadow-[0_0_0_1px_rgba(15,23,42,0.12)]">
        <rect width="20" height="14" fill="#de2910" />
        <polygon points="4,2.2 4.7,4.2 6.8,4.2 5.1,5.4 5.8,7.4 4,6.2 2.2,7.4 2.9,5.4 1.2,4.2 3.3,4.2" fill="#ffde00" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 14" className="h-2.5 w-3.5 rounded-[2px] shadow-[0_0_0_1px_rgba(15,23,42,0.12)]">
      <rect width="20" height="4.67" fill="#ff9933" />
      <rect y="4.67" width="20" height="4.66" fill="#fff" />
      <rect y="9.33" width="20" height="4.67" fill="#138808" />
      <circle cx="10" cy="7" r="1.5" fill="none" stroke="#000080" strokeWidth="0.4" />
    </svg>
  );
}

export default function GlobeVisual() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const context = canvas.getContext("2d");
    let frame = 0;
    let raf = 0;
    const image = new Image();
    image.src = "/earth.jpg";

    const draw = () => {
      const size = canvas.width;
      const radius = size * 0.46;
      const cx = size / 2;
      const cy = size / 2;
      context.clearRect(0, 0, size, size);

      if (image.complete && image.naturalWidth) {
        const off = document.createElement("canvas");
        off.width = size;
        off.height = size;
        const octx = off.getContext("2d");
        const imgData = octx.createImageData(size, size);
        const data = imgData.data;
        const src = document.createElement("canvas");
        src.width = image.naturalWidth;
        src.height = image.naturalHeight;
        const sctx = src.getContext("2d");
        sctx.drawImage(image, 0, 0);
        const pixels = sctx.getImageData(0, 0, src.width, src.height).data;
        const w = src.width;
        const h = src.height;

        for (let py = 0; py < size; py += 1) {
          for (let px = 0; px < size; px += 1) {
            const nx = (px - cx) / radius;
            const ny = (cy - py) / radius;
            const r2 = nx * nx + ny * ny;
            if (r2 > 1) continue;
            const nz = Math.sqrt(1 - r2);
            const pitch = deg(CENTER.lat);
            const z1 = nz * Math.cos(pitch) + ny * Math.sin(pitch);
            const y1 = ny * Math.cos(pitch) - nz * Math.sin(pitch);
            const yaw = deg(CENTER.lon - 90);
            const x0 = nx * Math.cos(yaw) - z1 * Math.sin(yaw);
            const z0 = nx * Math.sin(yaw) + z1 * Math.cos(yaw);
            const lat = Math.asin(Math.max(-1, Math.min(1, y1)));
            const lon = Math.atan2(z0, x0);
            const u = ((lon / (Math.PI * 2) + 0.5) % 1) * (w - 1);
            const v = (0.5 - lat / Math.PI) * (h - 1);
            const ix = Math.max(0, Math.min(w - 1, Math.round(u)));
            const iy = Math.max(0, Math.min(h - 1, Math.round(v)));
            const i = (iy * w + ix) * 4;
            const shade = 0.62 + 0.5 * nz;
            const index = (py * size + px) * 4;
            data[index] = Math.min(255, pixels[i] * shade);
            data[index + 1] = Math.min(255, pixels[i + 1] * shade);
            data[index + 2] = Math.min(255, pixels[i + 2] * shade + 8);
            data[index + 3] = 255;
          }
        }
        octx.putImageData(imgData, 0, 0);
        context.drawImage(off, 0, 0);
      } else {
        const gradient = context.createRadialGradient(cx - radius * 0.2, cy - radius * 0.25, radius * 0.2, cx, cy, radius);
        gradient.addColorStop(0, "#8fb4d6");
        gradient.addColorStop(0.55, "#2c5f86");
        gradient.addColorStop(1, "#16324d");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(cx, cy, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.clip();
      const gloss = context.createRadialGradient(cx - radius * 0.35, cy - radius * 0.4, radius * 0.1, cx, cy, radius);
      gloss.addColorStop(0, "rgba(255,255,255,0.22)");
      gloss.addColorStop(0.45, "rgba(255,255,255,0)");
      gloss.addColorStop(1, "rgba(0,10,30,0.28)");
      context.fillStyle = gloss;
      context.fillRect(0, 0, size, size);
      context.restore();

      const dash = (frame % 80) / 80;
      ARCS.forEach((arc) => {
        const samples = [];
        for (let t = 0; t <= 24; t += 1) {
          const f = t / 24;
          const lat = arc[0][0] + (arc[1][0] - arc[0][0]) * f;
          const lon = arc[0][1] + (arc[1][1] - arc[0][1]) * f;
          const lift = Math.sin(Math.PI * f) * 7;
          const point = project(lat + lift * 0.15, lon, radius);
          if (point.visible) samples.push([cx + point.x, cy + point.y]);
        }
        if (samples.length < 2) return;
        context.beginPath();
        context.moveTo(samples[0][0], samples[0][1]);
        samples.slice(1).forEach(([x, y]) => context.lineTo(x, y));
        context.strokeStyle = "rgba(227,36,27,0.95)";
        context.lineWidth = Math.max(2, size / 280);
        context.setLineDash([8, 7]);
        context.lineDashOffset = -dash * 30;
        context.stroke();
        context.setLineDash([]);
      });

      CITIES.forEach((city) => {
        const point = project(city.lat, city.lon, radius);
        if (!point.visible) return;
        const x = cx + point.x;
        const y = cy + point.y;
        context.beginPath();
        context.arc(x, y, Math.max(4, size / 160), 0, Math.PI * 2);
        context.fillStyle = city.flag === "cn" ? "#e3241b" : "#0a0a0a";
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "#fff";
        context.stroke();
      });

      frame += 1;
      raf = requestAnimationFrame(drawRoutesOnly);
      wrap._globeBase = context.getImageData(0, 0, size, size);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(drawRoutesOnly);

      function drawRoutesOnly() {
        if (!wrap._globeBase) return;
        context.putImageData(wrap._globeBase, 0, 0);
        const offset = (frame % 90) / 90;
        ARCS.forEach((arc) => {
          const samples = [];
          for (let t = 0; t <= 28; t += 1) {
            const f = t / 28;
            const lat = arc[0][0] + (arc[1][0] - arc[0][0]) * f + Math.sin(Math.PI * f) * 1.4;
            const lon = arc[0][1] + (arc[1][1] - arc[0][1]) * f;
            const point = project(lat, lon, radius);
            if (point.visible) samples.push([cx + point.x, cy + point.y]);
          }
          if (samples.length < 2) return;
          context.beginPath();
          samples.forEach(([x, y], index) => (index ? context.lineTo(x, y) : context.moveTo(x, y)));
          context.strokeStyle = "#e3241b";
          context.lineWidth = Math.max(2.2, size / 260);
          context.lineCap = "round";
          context.setLineDash([7, 8]);
          context.lineDashOffset = -offset * 40;
          context.stroke();
          context.setLineDash([]);
          const head = samples[Math.floor(offset * (samples.length - 1))];
          if (head) {
            context.beginPath();
            context.arc(head[0], head[1], 5, 0, Math.PI * 2);
            context.fillStyle = "#fff";
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = "#e3241b";
            context.stroke();
          }
        });
        CITIES.forEach((city) => {
          const point = project(city.lat, city.lon, radius);
          if (!point.visible) return;
          context.beginPath();
          context.arc(cx + point.x, cy + point.y, Math.max(4.5, size / 150), 0, Math.PI * 2);
          context.fillStyle = "#e3241b";
          context.fill();
          context.lineWidth = 2.4;
          context.strokeStyle = "#fff";
          context.stroke();
        });
        frame += 1;
        raf = requestAnimationFrame(drawRoutesOnly);
      }
    };

    const resize = () => {
      const width = wrap.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const next = Math.max(480, Math.floor(width));
      if (canvas.width !== Math.floor(next * dpr)) {
        canvas.width = Math.floor(next * dpr);
        canvas.height = Math.floor(next * dpr);
        canvas.style.width = `${next}px`;
        canvas.style.height = `${next}px`;
        wrap._globeBase = null;
      }
    };

    const start = () => {
      resize();
      cancelAnimationFrame(raf);
      draw();
    };

    image.onload = start;
    image.onerror = start;
    if (image.complete) start();
    window.addEventListener("resize", start);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", start);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full">
      <div className="pointer-events-none absolute inset-[2%] rounded-full bg-[radial-gradient(circle,rgba(90,150,230,0.55),rgba(70,130,220,0.18)_42%,transparent_68%)] blur-2xl" />
      <canvas ref={canvasRef} className="relative z-[1] h-full w-full" />
      <div className="pointer-events-none absolute inset-0 z-[2]">
        {CITIES.map((city) => (
          <CityLabel key={city.name} city={city} />
        ))}
      </div>
    </div>
  );
}

function CityLabel({ city }) {
  const ref = useRef(null);

  useEffect(() => {
    const place = () => {
      const parent = ref.current?.parentElement?.parentElement;
      const canvas = parent?.querySelector("canvas");
      if (!parent || !canvas || !ref.current) return;
      const radius = canvas.clientWidth * 0.46;
      const point = project(city.lat, city.lon, radius);
      if (!point.visible) {
        ref.current.style.opacity = "0";
        return;
      }
      const x = canvas.clientWidth / 2 + point.x;
      const y = canvas.clientWidth / 2 + point.y;
      ref.current.style.opacity = "1";
      ref.current.style.left = `${x}px`;
      ref.current.style.top = `${y}px`;
    };
    place();
    window.addEventListener("resize", place);
    const timer = setInterval(place, 400);
    return () => {
      window.removeEventListener("resize", place);
      clearInterval(timer);
    };
  }, [city]);

  return (
    <span
      ref={ref}
      className="absolute flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-black/10 bg-white/92 px-2 py-1 text-[11px] font-semibold text-ink shadow-[0_6px_18px_-8px_rgba(15,23,42,0.35)]"
      style={{ transform: "translate(10px, -50%)" }}
    >
      <Flag code={city.flag} />
      {city.name}
    </span>
  );
}

export { Flag };
