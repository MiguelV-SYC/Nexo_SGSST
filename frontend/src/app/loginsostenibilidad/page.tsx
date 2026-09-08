import type { Metadata } from "next"

import { NexoBackground } from "@/components/background/NexoBackground"
import { LoginScreen } from "@/components/login/LoginScreen"
import { SOST_BACKGROUND_THEME, SOST_COLOR } from "@/lib/sostenibilidad-theme"

export const metadata: Metadata = {
  title: "Iniciar sesión | Nexo Sostenibilidad",
}

export default function SostenibilidadLoginPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: SOST_COLOR.deep }}
    >
      <NexoBackground theme={SOST_BACKGROUND_THEME} />
      <LoginScreen
        label="SOSTENIBILIDAD"
        tagline={
          <>
            Conectamos procesos, recursos y resultados
            <br />
            para un planeta más sostenible.
          </>
        }
        loginCard={{
          destination: "/sostenibilidad/syc",
          accentColor: SOST_COLOR.limeText,
          brandColor: SOST_COLOR.limeText,
          buttonGradient: `linear-gradient(90deg, ${SOST_COLOR.forest}, ${SOST_COLOR.limeButton})`,
        }}
      />
    </div>
  )
}
