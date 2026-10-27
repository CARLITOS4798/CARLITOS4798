// Ícono provisional de la marca (una tiendita con toldo).
// Se puede reemplazar por el logo definitivo cuando exista.
function Logo({ tamano = 36 }) {
  return (
    <svg
      className="logo"
      width={tamano}
      height={tamano}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="40" height="40" rx="11" fill="var(--verde)" />
      <path d="M9 15h22l-2 5H11z" fill="var(--terracota)" />
      <path d="M11 20h18v10a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2z" fill="var(--crema)" />
      <rect x="17.5" y="24" width="5" height="8" rx="1" fill="var(--verde)" />
      <path d="M12 11h16l3 4H9z" fill="var(--crema)" />
    </svg>
  )
}

export default Logo
