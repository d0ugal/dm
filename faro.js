import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";
import { ReplayInstrumentation } from "@grafana/faro-instrumentation-replay";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

const config = globalThis.DOUGALMATTHEWS_COM_CONFIG ?? {};
const collectorEndpoint =
  typeof config.grafanaFaroCollectorEndpoint === "string"
    ? config.grafanaFaroCollectorEndpoint.trim()
    : "";
const appVersion =
  typeof config.version === "string" && config.version.trim()
    ? config.version.trim()
    : "dev";
const replaySamplingRate =
  typeof config.replaySamplingRate === "number"
    ? Math.max(0, Math.min(1, config.replaySamplingRate))
    : 0.1;

if (typeof window !== "undefined" && collectorEndpoint) {
  try {
    initializeFaro({
      url: collectorEndpoint,
      app: {
        name: "dougalmatthews-com",
        version: appVersion,
        environment: "production",
      },
      instrumentations: [
        ...getWebInstrumentations(),
        new TracingInstrumentation(),
        new ReplayInstrumentation({
          recordAfter: "load",
          recordCrossOriginIframes: false,
          samplingRate: replaySamplingRate,
        }),
      ],
    });
  } catch (error) {
    console.error("Failed to initialize Grafana Faro", error);
  }
}
