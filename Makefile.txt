GROUP_NUMBER=19
CLASS_CODE=GRA0400102NMA
COMPANY=Pilar

.PHONY: package
package:
	zip -r Trabalho_Avaliacao2_$(CLASS_CODE)_Grupo$(GROUP_NUMBER).zip .
