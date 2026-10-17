import { resolveWidget } from "@/components/widgets/registry";
import {
  getCategorySections,
  sectionPositionStyle,
  sectionRowsTemplate,
} from "@/lib/layout/resolve";
import {
  widgetCategoryLabel,
  type ModeLayout,
} from "@/lib/layout/types";

type ModularGridProps = {
  layout: ModeLayout;
};

export function ModularGrid({ layout }: ModularGridProps) {
  const sections = getCategorySections(layout);

  return (
    <div className="heimdall-layout flex flex-1 flex-col gap-6 sm:gap-7 lg:gap-8">
      {sections.map((section) => (
        <section
          key={section.category}
          className="heimdall-section min-h-0"
          data-category={section.category}
        >
          <header className="heimdall-section__head mb-3 flex items-end gap-3 sm:mb-3.5">
            <h2 className="heimdall-section__title">
              {widgetCategoryLabel[section.category]}
            </h2>
            <span className="heimdall-section__rule" aria-hidden />
          </header>
          <div
            className="heimdall-grid"
            data-mode={layout.mode}
            data-section={section.category}
            style={{
              gridTemplateColumns: layout.columns,
              gridTemplateRows: sectionRowsTemplate(section.widgets),
            }}
          >
            {section.widgets.map((widget) => {
              const Widget = resolveWidget(widget.type);
              return (
                <div
                  key={widget.id}
                  className="heimdall-grid-cell min-h-0 min-w-0"
                  style={sectionPositionStyle(widget)}
                  data-widget-id={widget.id}
                  data-widget-type={widget.type}
                  data-widget-category={widget.category}
                >
                  <Widget
                    title={widget.title}
                    category={widget.category}
                    props={widget.props}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
