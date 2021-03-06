package data.base;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import data.annotations.Encrypted;
import data.annotations.RequiredOnPage;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ReportGeneratorWizardData extends WizardData {

    @Encrypted
    @RequiredOnPage(1)
    @JsonIgnore
    private String onBehalfOfUser;

    @Encrypted
    @RequiredOnPage(1)
    @JsonIgnore
    private Long entityId;

    @Encrypted
    @JsonIgnore
    private String documentId;

    @Encrypted
    @RequiredOnPage(1)
    @JsonProperty("_DELIUS_CRN_")
    private String crn;

    @JsonProperty("_WATERMARK_")
    private String watermark;
}
