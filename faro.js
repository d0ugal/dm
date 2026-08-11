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
  typeof config.replaySamplingRate === "number" &&
  Number.isFinite(config.replaySamplingRate)
    ? Math.max(0, Math.min(1, config.replaySamplingRate))
    : 1;

if (typeof window !== "undefined" && collectorEndpoint) {
  try {
    initializeFaro({
      url: collectorEndpoint,
      app: {
        name: "dougalmatthews-com",
        version: appVersion,
        environment: "production",
      },
      sessionTracking: {
        samplingRate: 1,
      },
      trackResources: true,
      experimental: {
        trackNavigation: true,
      },
      instrumentations: [
        // These are the SDK defaults today; keep them explicit for future Faro upgrades.
        ...getWebInstrumentations({
          captureConsole: true,
          enableContentSecurityPolicyInstrumentation: true,
          enablePerformanceInstrumentation: true,
        }),
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
