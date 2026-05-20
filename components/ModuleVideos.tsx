type Props = {
  title?: string;
  videos: string[];
};

export function ModuleVideos({ title = "Обучающие видео", videos }: Props) {
  if (!videos.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {videos.map((src) => (
          <div key={src} className="aspect-video overflow-hidden rounded-xl bg-slate-100">
            <iframe
              src={src}
              title="Видео о модуле"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </section>
  );
}
