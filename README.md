# Sistema de Conferência de Pacotes (MVP)

## Visão Geral

Este projeto é uma Prova de Conceito (POC) desenvolvida em Angular para digitalizar o processo de conferência de pacotes em uma operação logística vinculada ao Mercado Livre, substituindo a conferência manual em papel por uma solução reativa, auditável e com rastreabilidade.

O sistema permite:

- Importar listas de pacotes vindas do Mercado Livre (CSV/Excel ou texto).
- Ler códigos de barras via scanner.
- Comparar a lista oficial com o que foi bipado.
- Classificar automaticamente pacotes em categorias (OK, faltantes, excedentes).

Esta POC é a base para evolução futura, mantendo uma arquitetura escalável e organizada por domínios.

---

## Objetivo do MVP

- Garantir conferência digital com rastreabilidade.
- Substituir ticagem manual em papel.
- Reduzir divergências, perdas e suspeitas de fraude.
- Prover um estado reativo e atualizado em tempo real da conferência.

### Funcionalidades principais

- Importar lista oficial de IDs (planilha ou texto colado).
- Bipar códigos de barras via leitor USB (como entrada de teclado).
- Comparar lista oficial x lista bipada.
- Classificar pacotes em:
  - OK
  - Faltantes
  - Excedentes
- Exibir resultados em tempo real.

*(Versões futuras: controle de devoluções, motivos, inventário, histórico e dashboards.)*

---

## Arquitetura da Aplicação

A aplicação utiliza uma Arquitetura Híbrida moderna em Angular, combinando:

- RxJS para tratar fluxos de eventos contínuos (scanner, importação).
- Angular Signals para armazenar o estado final derivado e expor para a UI.
- Organização por domínio para isolar regras de negócio (Conference, Returns, Inventory, etc.).
- Standalone Components sem uso obrigatório de NgModules e rotas lazy com `loadComponent`.

O shell (`AppComponent`) rende a navegação principal e um `<router-outlet>`, enquanto cada rota principal carrega seu container sob demanda:

| Rota | Componente | Responsabilidade |
| --- | --- | --- |
| `/` | `DashboardPageComponent` | KPIs resumidos e atalhos para as etapas operacionais. |
| `/importacao` | `ImportPageComponent` | Importa planilhas CSV/XLSX e publica a lista oficial. |
| `/scanner` | `ScannerPageComponent` | Concentra as leituras do scanner/manual e atualiza o estado em tempo real. |

Todos os containers consomem o mesmo `ConferenceStore`, que expõe `totals`, `officialRows` e `scannedRows`, e emitem efeitos via `ConferenceStream`.

Em resumo:

- Eventos (scanner, Excel) entram como Observables.
- São processados em pipelines RxJS (ConferenceStream).
- O resultado é armazenado em Signals (ConferenceStore).
- A UI consome Signals, sem lidar diretamente com Observables.

---

## Estrutura de Diretórios

```bash
src/app/
├── app.routes.ts            # Rotas lazy para dashboard/importação/scanner
├── core/
│   ├── models/                 # Tipos e entidades de domínio
│   ├── services/               # Serviços técnicos e utilitários
│   │   ├── excel.service.ts         # Importa planilhas -> stream de IDs
│   │   ├── scanner.service.ts       # Captura bipagens -> stream de IDs
│   │   └── storage.service.ts       # Persistência local (futuro)
│   └── utils/                  # Funções auxiliares (parsers, etc.)
│
├── domains/
│   ├── dashboard/
│   │   └── pages/
│   │       └── dashboard-page.component.*
│   └── conference/
│       ├── streams/            # Pipelines RxJS (lógica reativa)
│       │   └── conference.stream.ts
│       ├── state/              # Store reativo com Signals
│       │   └── conference.store.ts
│       ├── pages/              # Containers principais de tela
│       │   ├── conference-page/
│       │   ├── import-page/
│       │   └── scanner-page/
│       └── components/         # Componentes de UI do domínio
│           ├── import-panel/
│           ├── scan-input/
│           ├── result-panel/
│           └── status-cards/
│
└── shared/
    └── components/             # Componentes genéricos reutilizáveis

docs/
└── architecture.md            # Visão arquitetural detalhada
```
