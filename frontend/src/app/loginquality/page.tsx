import type { Metadata } from "next"

import { NexoBackground } from "@/components/background/NexoBackground"
import { LoginScreen } from "@/components/login/LoginScreen"

export const metadata: Metadata = {
  title: "Iniciar sesión | Nexo Calidad",
}

export default function CalidadLoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08344A]">
      <NexoBackground />
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
        }}
      />
    </div>
  )
}
