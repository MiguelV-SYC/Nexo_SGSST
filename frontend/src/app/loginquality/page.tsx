import type { Metadata } from "next"

import { NexoBackground } from "@/components/background/NexoBackground"
import { LoginScreen } from "@/components/login/LoginScreen"
import { CALIDAD_BACKGROUND_THEME, CALIDAD_COLOR } from "@/lib/calidad-theme"

export const metadata: Metadata = {
  title: "Iniciar sesión | Nexo Calidad",
}

export default function CalidadLoginPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: CALIDAD_COLOR.deep }}
    >
      <NexoBackground theme={CALIDAD_BACKGROUND_THEME} />
      <LoginScreen
        label="QUALITY"
        tagline={
          <>
            Conectamos procesos, normas y evidencias
            <br />
            para una gestión con excelencia.
          </>
        }
        loginCard={{
          destination: "/calidad/syc",
          accentColor: CALIDAD_COLOR.heroAccent,
          brandColor: CALIDAD_COLOR.royal,
          buttonGradient: `linear-gradient(90deg, ${CALIDAD_COLOR.royal}, ${CALIDAD_COLOR.light})`,
        }}
      />
    </div>
  )
}
