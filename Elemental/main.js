import {
    fastButton,
    fastCheckbox,
    provideFASTDesignSystem
} from "@microsoft/fast-components";


provideFASTDesignSystem()
    .withPrefix("ae")
    .register(fastCheckbox())
    .register(fastButton());